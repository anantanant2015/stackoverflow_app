defmodule StackoverflowBe.LLM.Reranker do
  @moduledoc """
  Handles reranking of StackOverflow answers using local or remote LLMs.
  """

  @llm_url System.get_env("LLM_API_URL", "http://local_llm:11434/api/generate")

  def rerank_answers(question, answers, user_input) do
    prompt =
      user_input
      |> JSON.encode!()
      |> build_prompt(question, answers)

    body = %{
      # match the model you've pulled
      model: "tinyllama",
      prompt: prompt,
      stream: false
    }

    headers = [{"Content-Type", "application/json"}]

    case HTTPoison.post(@llm_url, Jason.encode!(body), headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        parse_reranked_answers(Jason.decode!(body))

      {:error, err} ->
        IO.inspect(err, label: "LLM Error")
        answers
    end
  end

  defp build_prompt(user_input, question, answers) do
    base = """
    You are a helpful assistant. Given a programming question and multiple StackOverflow answers, rerank them by relevance to the user input.

    Question: #{question}
    User input: #{user_input}

    Answers:
    #{JSON.encode!(answers)}

    Provide a re-ranked list of items answer indices in order of relevance and in the same format as Answers.
    """

    String.trim(base)
  end

  defp parse_reranked_answers(%{"response" => response}) do
    response
    |> String.replace(~r/[^0-9\s]/, "")
    |> String.split()
    |> Enum.map(&String.to_integer/1)
  rescue
    _ -> []
  end
end
