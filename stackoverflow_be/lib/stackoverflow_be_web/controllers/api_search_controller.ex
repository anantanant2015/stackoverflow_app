# lib/stackoverflow_be_web/controllers/api/search_controller.ex
defmodule StackoverflowBeWeb.Api.SearchController do
  use StackoverflowBeWeb, :controller
  alias StackoverflowBe.Context.Search

  # plug :require_authenticated_user

  def index(conn, params) do
    user_id = conn.assigns.current_user.id
    result = Search.search(params)
    Search.log_user_query(user_id, params)
    json(conn, result)
  end
end
