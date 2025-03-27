defmodule StackoverflowApp.Repo do
  use Ecto.Repo,
    otp_app: :stackoverflow_app,
    adapter: Ecto.Adapters.Postgres
end
