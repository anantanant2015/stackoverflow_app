# lib/stackoverflow_be/search.ex
defmodule StackoverflowBe.Context.Search do
  alias StackoverflowBe.Repo
  alias StackoverflowBe.Schema.{CachedQuery, UserQuery}

  def generate_cache_key(params) do
    params |> Enum.sort() |> :erlang.phash2() |> Integer.to_string()
  end

  def get_cached(key) do
    case Repo.get_by(CachedQuery, key: key) do
      nil -> :error
      %CachedQuery{result: result} -> {:ok, result}
    end
  end

  def cache_result(key, params, result) do
    %CachedQuery{}
    |> CachedQuery.changeset(%{key: key, params: params, result: result})
    |> Repo.insert(on_conflict: :replace_all, conflict_target: :key)
  end

  def log_user_query(user_id, params) do
    %UserQuery{}
    |> UserQuery.changeset(%{user_id: user_id, query: params})
    |> Repo.insert()
  end
end
