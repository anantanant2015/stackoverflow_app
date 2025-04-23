defmodule StackoverflowBe.OpenAIClient do
  @moduledoc """
  Interacts with OpenAI's API to re-rank answers based on user instructions.
  """

  @api_key System.get_env("OPENAI_API_KEY")
  @base_url "https://api.openai.com/v1/completions"

  def rerank_answers(answers, user_instruction) do
    prompt = build_prompt(answers, user_instruction)

    headers = [
      {"Content-Type", "application/json"},
      {"Authorization", "Bearer #{@api_key}"}
    ]

    body = %{
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7
    }

    case HTTPoison.post(@base_url, Jason.encode!(body), headers) do
      {:ok, response} ->
        {:ok, parse_response(response.body)}

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp build_prompt(answers, user_instruction) do
    """
    Given the following answers, please rank them based on the instruction: "#{user_instruction}"

    Answers:
    #{Enum.map(answers, fn ans -> "- #{ans}" end) |> Enum.join("\n")}
    """
  end

  defp parse_response(body) do
    case Jason.decode(body) do
      {:ok, %{"choices" => [%{"text" => text} | _]}} ->
        text
        |> String.split("\n")
        |> Enum.map(&String.trim/1)

      _ ->
        []
    end
  end
end
