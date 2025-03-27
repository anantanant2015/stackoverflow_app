defmodule StackoverflowAppWeb.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      StackoverflowAppWeb.Telemetry,
      # Start a worker by calling: StackoverflowAppWeb.Worker.start_link(arg)
      # {StackoverflowAppWeb.Worker, arg},
      # Start to serve requests, typically the last entry
      StackoverflowAppWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: StackoverflowAppWeb.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    StackoverflowAppWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
