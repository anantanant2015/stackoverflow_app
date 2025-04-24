# lib/stackoverflow_be_web/controllers/auth_controller.ex
defmodule StackoverflowBeWeb.Api.AuthController do
  use StackoverflowBeWeb, :controller
  alias StackoverflowBe.Context.Accounts

  def callback(conn, %{"code" => code, "code_verifier" => verifier}) do
    with {:ok, %{"access_token" => token}} <- exchange_code(code, verifier),
         {:ok, user_info} <- fetch_user_info(token),
         {:ok, user} <-
           Accounts.get_or_create_user_from_sso(Map.put(user_info, "access_token", token)) do
      json(conn, %{user: user, access_token: token})
    else
      _ -> conn |> put_status(:unauthorized) |> json(%{error: "Auth failed"})
    end
  end

  defp exchange_code(code, verifier) do
    client_id = System.get_env("STACK_APP_CLIENT_ID")
    client_secret = System.get_env("STACK_APP_CLIENT_SECRET")
    redirect_uri = System.get_env("STACK_APP_REDIRECT_URI")

    HTTPoison.post(
      "https://stackoverflow.com/oauth/access_token/json",
      Plug.Conn.Query.encode(%{
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        code_verifier: verifier,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      }),
      [{"Content-Type", "application/x-www-form-urlencoded"}]
    )
    |> case do
      {:ok, %{status_code: 200, body: body}} ->
        {:ok, Jason.decode!(body)}

      {:ok, %{status_code: status, body: body}} ->
        {:error, :token_exchange_failed}

      err ->
        {:error, :token_exchange_failed}
    end
  end

  defp fetch_user_info(token) do
    url =
      "https://api.stackexchange.com/2.3/me?site=stackoverflow&access_token=#{token}&key=#{System.get_env("STACKEXCHANGE_KEY")}"

    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} ->
        case Jason.decode!(body)["items"] do
          [user | _] ->
            {:ok,
             %{
               "user_id" => user["user_id"],
               "display_name" => user["display_name"],
               "profile_image" => user["profile_image"]
             }}

          _ ->
            {:error, :bad_user_info}
        end

      _ ->
        {:error, :fetch_user_failed}
    end
  end
end
