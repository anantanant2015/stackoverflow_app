// src/pages/AuthCallback.js
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const query = new URLSearchParams(useLocation().search);
  const code = query.get("code");

  useEffect(() => {
    async function fetchToken() {
      const codeVerifier = localStorage.getItem("pkce_code_verifier");
      const res = await fetch("/api/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, code_verifier: codeVerifier }),
      });

      if (res.ok) {
        const { user, token } = await res.json();
        localStorage.setItem("token", token);
        setUser(user); // assumes you have setUser in AuthContext
        navigate("/");
      } else {
        alert("Login failed");
        navigate("/");
      }
    }

    if (code) fetchToken();
  }, [code, navigate, setUser]);

  return <p>Logging in...</p>;
}
