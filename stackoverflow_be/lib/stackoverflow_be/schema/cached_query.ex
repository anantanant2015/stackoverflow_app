defmodule StackoverflowBe.Schema.CachedQuery do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cached_queries" do
    field(:key, :string)
    field(:params, :map)
    field(:result, :map)
    timestamps()
  end

  def changeset(query, attrs) do
    query
    |> cast(attrs, [:key, :params, :result])
    |> validate_required([:key, :params, :result])
    |> unique_constraint(:key)
  end
end
