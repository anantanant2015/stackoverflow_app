defmodule StackoverflowBe.Repo.Migrations.CreateCachedQueries do
  use Ecto.Migration

  def change do
    create table(:cached_queries) do
      add :key, :string
      add :result, :map
      add :params, :map

      timestamps(type: :utc_datetime)
    end
  end
end
