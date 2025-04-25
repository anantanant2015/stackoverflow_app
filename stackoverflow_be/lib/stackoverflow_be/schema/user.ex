defmodule StackoverflowBe.Schema.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:external_id, :integer)
    field(:display_name, :string)
    field(:profile_image, :string)
    field(:access_token, :string)

    has_many(:queries, StackoverflowBe.Search.UserQuery)

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:external_id, :display_name, :profile_image, :access_token])
    |> validate_required([:external_id])
    |> unique_constraint(:external_id)
  end
end
