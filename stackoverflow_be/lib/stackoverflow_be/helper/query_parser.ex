defmodule StackoverflowBe.Helper.QueryParser do
  @moduledoc """
  Parses StackOverflow-style search query into StackExchange API params.
  """

  # Match key:value (tagged:elixir), quoted string ("exact phrase"), or word
  @pattern ~r/(?<key>\w+):(?:"([^"]+)"|(\S+))|(?:"([^"]+)")|(\S+)/

  @multi_keys ["tagged", "nottagged"]

  @default_params %{
    "order" => "desc",
    "sort" => "activity",
    "pagesize" => 10,
    "page" => 1
  }

  def parse(nil), do: %{}

  def parse(%{"q" => q} = params) when is_binary(q) do
    parsed =
      Regex.scan(@pattern, q)
      |> Enum.reduce(%{}, fn match, acc ->
        cond do
          # key:value
          Enum.at(match, 1) ->
            key = Enum.at(match, 1)
            val = Enum.at(match, 2) || Enum.at(match, 3)

            Map.update(acc, key, val, fn existing ->
              if key in @multi_keys, do: "#{existing};#{val}", else: val
            end)

          # "exact phrase"
          Enum.at(match, 4) ->
            phrase = Enum.at(match, 4)
            Map.update(acc, "intitle", phrase, fn existing -> "#{existing} #{phrase}" end)

          # plain word
          Enum.at(match, 5) ->
            word = Enum.at(match, 5)
            Map.update(acc, "intitle", word, fn existing -> "#{existing} #{word}" end)

          true ->
            acc
        end
      end)

    finalize_query_params(params, parsed)
  end

  def parse(params) when is_map(params), do: finalize_query_params(params, %{})

  # Private function to finalize and clean the parsed result
  defp finalize_query_params(params, parsed_params) do
    # Drop empty keys and values
    cleaned_parsed =
      parsed_params
      |> Enum.reject(fn {k, v} -> k in [nil, ""] or v in [nil, ""] end)
      |> Enum.into(%{})

    # Remove unwanted keys from original params
    filtered_params =
      Map.drop(params, ["q", "path", "method"])

    # Decide whether to merge default_params
    if Map.has_key?(cleaned_parsed, "tagged") or Map.has_key?(cleaned_parsed, "intitle") do
      Map.merge(filtered_params, cleaned_parsed)
    else
      filtered_params
      |> Map.put("intitle", params["q"])
      |> Map.merge(cleaned_parsed)
      |> Map.merge(@default_params)
    end
  end
end
