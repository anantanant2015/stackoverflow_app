defmodule StackoverflowBe.API do
  @moduledoc """
  Fetches questions from StackOverflow API
  """
  @base_url "https://api.stackexchange.com/2.3/questions"

  def fetch_questions() do
    case HTTPoison.get("#{@base_url}?site=stackoverflow") do
      {:ok, response} ->
        {:ok, Jason.decode!(response.body)["items"]}
      {:error, _reason} ->
        {:error, "Unable to fetch questions"}
    end
  end
end
