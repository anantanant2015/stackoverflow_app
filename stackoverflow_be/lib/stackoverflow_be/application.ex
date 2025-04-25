defmodule StackoverflowBe.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      StackoverflowBeWeb.Telemetry,
      StackoverflowBe.Repo,
      {DNSCluster, query: Application.get_env(:stackoverflow_be, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: StackoverflowBe.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: StackoverflowBe.Finch},
      # Start a worker by calling: StackoverflowBe.Worker.start_link(arg)
      # {StackoverflowBe.Worker, arg},
      # Start to serve requests, typically the last entry
      StackoverflowBeWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: StackoverflowBe.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    StackoverflowBeWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
