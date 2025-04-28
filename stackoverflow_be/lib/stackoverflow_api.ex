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

  def fetch_answers(question_id) do
    url = "https://api.stackexchange.com/2.3/questions/#{question_id}/answers?site=stackoverflow"
    case HTTPoison.get(url) do
      {:ok, response} ->
        {:ok, Jason.decode!(response.body)["items"]}
      {:error, _reason} ->
        {:error, "Unable to fetch answers"}
    end
  end

end
