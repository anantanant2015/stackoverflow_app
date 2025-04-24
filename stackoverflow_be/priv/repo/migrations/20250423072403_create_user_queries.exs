defmodule StackoverflowBe.Repo.Migrations.CreateUserQueries do
  use Ecto.Migration

  def change do
    create table(:user_queries) do
      add :query, :map
      add :user_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:user_queries, [:user_id])
  end
end
