defmodule StackoverflowBe.API do
  @moduledoc """
  Generic proxy to StackExchange API
  """

  @base_url "https://api.stackexchange.com/2.3"

  def proxy_request(method, path, params \\ %{}, body \\ nil) do
    url = "#{@base_url}#{path}?#{URI.encode_query(params)}"

    headers = [{"Content-Type", "application/json"}]

    options = [headers: headers]

    case method do
      :get ->
        HTTPoison.get(url, headers)

      :post ->
        HTTPoison.post(url, Jason.encode!(body || %{}), headers)

      :put ->
        HTTPoison.put(url, Jason.encode!(body || %{}), headers)

      :delete ->
        HTTPoison.delete(url, headers)

      _ ->
        {:error, "Unsupported HTTP method"}
    end
    |> handle_response()
  end

  defp handle_response({:ok, %HTTPoison.Response{status_code: code, body: body}}) when code in 200..299 do
    {:ok, Jason.decode!(body)}
  end

  defp handle_response({:ok, %HTTPoison.Response{status_code: code, body: body}}) do
    {:error, %{status: code, body: Jason.decode!(body)}}
  end

  defp handle_response({:error, reason}) do
    {:error, reason}
  end
end
