defmodule StackoverflowApp.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      StackoverflowApp.Repo,
      {DNSCluster, query: Application.get_env(:stackoverflow_app, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: StackoverflowApp.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: StackoverflowApp.Finch}
      # Start a worker by calling: StackoverflowApp.Worker.start_link(arg)
      # {StackoverflowApp.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: StackoverflowApp.Supervisor)
  end
end
