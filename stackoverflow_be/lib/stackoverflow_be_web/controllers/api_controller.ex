defmodule StackoverflowBeWeb.ApiController do
  use Web, :controller
  alias StackoverflowBe.API, as: StackOverflowAPI

  def index(conn, _params) do
    case StackOverflowAPI.fetch_questions() do
      {:ok, questions} -> json(conn, questions)
      {:error, reason} -> json(conn, %{error: reason})
    end
  end

  def show_answers(conn, %{"id" => id}) do
    case StackOverflowAPI.fetch_answers(id) do
      {:ok, answers} -> json(conn, answers)
      {:error, reason} -> json(conn, %{error: reason})
    end
  end

end
