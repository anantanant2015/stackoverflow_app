# lib/stackoverflow_be/accounts.ex
defmodule StackoverflowBe.Context.Accounts do
  alias StackoverflowBe.Repo
  alias StackoverflowBe.Schema.User

  def get_or_create_user_from_sso(%{
        "user_id" => external_id,
        "display_name" => name,
        "profile_image" => image,
        "access_token" => token
      }) do
    Repo.get_by(User, external_id: external_id)
    |> case do
      nil ->
        %User{}
        |> User.changeset(%{
          external_id: external_id,
          display_name: name,
          profile_image: image,
          access_token: token
        })
        |> Repo.insert()

      user ->
        {:ok, user}
    end
  end
end
