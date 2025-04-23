# lib/stackoverflow_be/search.ex
defmodule StackoverflowBe.Context.Search do
  alias StackoverflowBe.Repo
  alias StackoverflowBe.Schema.{CachedQuery, UserQuery}
  # import Ecto.Query

  # @cache_limit 5

  def search(params) do
    cache_key = generate_cache_key(params)

    case get_cached(cache_key) do
      {:ok, result} ->
        result

      :error ->
        result = fetch_stackexchange(params)
        cache_result(cache_key, params, result)
        result
    end
  end

  defp generate_cache_key(params) do
    params |> Enum.sort() |> :erlang.phash2() |> Integer.to_string()
  end

  defp get_cached(key) do
    case Repo.get_by(CachedQuery, key: key) do
      nil -> :error
      %CachedQuery{result: result} -> {:ok, result}
    end
  end

  defp cache_result(key, params, result) do
    %CachedQuery{}
    |> CachedQuery.changeset(%{key: key, params: params, result: result})
    |> Repo.insert(on_conflict: :replace_all, conflict_target: :key)
  end

  defp fetch_stackexchange(params) do
    # Replace with your actual call to StackExchange API
    HTTPoison.get!(
      "https://api.stackexchange.com/2.3/search?order=desc&sort=activity&site=stackoverflow&#{URI.encode_query(params)}"
    )
    |> Map.get(:body)
    |> Jason.decode!()
  end

  def log_user_query(user_id, params) do
    %UserQuery{}
    |> UserQuery.changeset(%{user_id: user_id, query: params})
    |> Repo.insert()
  end
end
