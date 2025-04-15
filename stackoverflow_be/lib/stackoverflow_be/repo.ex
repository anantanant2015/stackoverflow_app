defmodule StackoverflowBe.Repo do
  use Ecto.Repo,
    otp_app: :stackoverflow_be,
    adapter: Ecto.Adapters.Postgres
end
