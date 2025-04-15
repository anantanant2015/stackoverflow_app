defmodule StackoverflowBeWeb.ApiControllerTest do
  use StackoverflowBeWeb.ConnCase

  describe "GET /api/questions/:id/answers" do
    test "fetches answers successfully", %{conn: conn} do
      conn = get(conn, "/api/questions/123/answers")
      assert json_response(conn, 200)["items"]
    end

    test "reranks answers based on user instructions", %{conn: conn} do
      conn = get(conn, "/api/questions/123/answers?rerank_instructions=rank%20by%20relevance")
      response = json_response(conn, 200)
      assert length(response["reranked"]) > 0
    end
  end
end
