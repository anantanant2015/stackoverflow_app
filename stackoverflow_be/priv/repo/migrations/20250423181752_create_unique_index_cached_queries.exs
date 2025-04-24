defmodule StackoverflowBe.Repo.Migrations.CreateUniqueIndexCachedQueries do
  use Ecto.Migration

  def change do
    create unique_index(:cached_queries, [:key])
  end
end
