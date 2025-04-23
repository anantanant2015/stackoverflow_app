defmodule StackoverflowBe.Schema.UserQuery do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_queries" do
    field(:query, :map)
    belongs_to(:user, StackoverflowBe.Accounts.User)
    timestamps()
  end

  def changeset(query, attrs) do
    query
    |> cast(attrs, [:user_id, :query])
    |> validate_required([:user_id, :query])
  end
end
