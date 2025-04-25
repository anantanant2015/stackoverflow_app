# lib/stackoverflow_be_web/controllers/api/search_controller.ex
defmodule StackoverflowBeWeb.Api.SearchController do
  use StackoverflowBeWeb, :controller
  alias StackoverflowBe.Context.Search
  alias StackoverflowBe.API
  alias StackoverflowBe.Helper.QueryParser
  alias StackoverflowBe.LLM.Reranker

  # plug :require_authenticated_user

  def index(conn, _params) do
    with %{"method" => method, "path" => path} <- conn.params do
      method_atom = String.downcase(method) |> String.to_existing_atom()

      # Extract body for write methods
      body =
        if conn.method in ["GET"] do
          conn.body_params
        else
          nil
        end

      # Drop internal keys and parse query
      # base_params = Map.drop(conn.params, ["method", "path"])
      # q_param = Map.get(base_params, "q")
      # parsed_q_params = QueryParser.parse(conn.params)

      final_params =
        QueryParser.parse(conn.params)
        |> Map.drop(["backend_cache", "rerank"])

      cache_key = Search.generate_cache_key(final_params)

      case Search.get_cached(cache_key) do
        {:ok, result} ->
          json(conn, result)

        :error ->
          case API.proxy_request(method_atom, path, final_params, body) do
            {:ok, result} ->
              user_id = get_in(conn.assigns, [:current_user, :id]) || 0

              if user_id != 0 && conn.params["backend_cache"] do
                Search.cache_result(cache_key, final_params, result)

                Search.log_user_query(user_id, final_params)
              end

              maybe_reranked_result =
                if conn.params["rerank"] do
                  Reranker.rerank_answers(conn.params["q"], result, final_params)
                else
                  result
                end

              json(conn, maybe_reranked_result)

            {:error, reason} ->
              IO.inspect(reason)
              json(conn, %{error: reason})
          end
      end
    else
      _ -> json(conn, %{error: "Missing method or path"})
    end
  end
end
