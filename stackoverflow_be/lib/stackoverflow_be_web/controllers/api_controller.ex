defmodule StackoverflowBeWeb.ApiController do
  use Web, :controller
  alias StackoverflowBe.API, as: StackOverflowAPI
  alias StackoverflowBe.OpenAIClient

  def index(conn, _params) do
    case StackOverflowAPI.fetch_questions() do
      {:ok, questions} -> json(conn, questions)
      {:error, reason} -> json(conn, %{error: reason})
    end
  end

  def show_answers(conn, %{"id" => id}) do
    case StackOverflowAPI.fetch_answers(id) do
      {:ok, answers} ->
        # Get the reranked answers based on user instructions
        case Map.get(conn.params, "rerank_instructions") do
          nil ->
            json(conn, answers)

          user_instruction ->
            case OpenAIClient.rerank_answers(answers, user_instruction) do
              {:ok, reranked_answers} ->
                json(conn, %{original: answers, reranked: reranked_answers})

              {:error, reason} ->
                json(conn, %{error: "Failed to rank answers: #{reason}"})
            end
        end

      {:error, reason} ->
        json(conn, %{error: reason})
    end
  end
end
