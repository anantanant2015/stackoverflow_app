defmodule StackoverflowBeWeb.Api.HealthController do
  use StackoverflowBeWeb, :controller

  def index(conn, _params) do
    send_resp(conn, 200, "ok")
  end
end
