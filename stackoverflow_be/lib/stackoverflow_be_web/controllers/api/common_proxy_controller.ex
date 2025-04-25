defmodule StackoverflowBeWeb.Api.CommonProxyController do
  use StackoverflowBeWeb, :controller
  alias StackoverflowBe.API

  def proxy(conn, _params) do
    with %{"method" => method, "path" => path} <- conn.params do
      method_atom = String.downcase(method) |> String.to_existing_atom()

      body =
        if conn.method in ["GET", "POST", "PUT", "PATCH"] do
          conn.body_params
        else
          nil
        end

      params = Map.drop(conn.params, ["method", "path"])

      case API.proxy_request(method_atom, path, params, body) do
        {:ok, result} -> json(conn, result)
        {:error, reason} -> json(conn, %{error: reason})
      end
    else
      _ -> json(conn, %{error: "Missing method or path"})
    end
  end
end
