defmodule StackoverflowBe.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :external_id, :integer
      add :display_name, :string
      add :profile_image, :string
      add :access_token, :string

      timestamps(type: :utc_datetime)
    end
  end
end
