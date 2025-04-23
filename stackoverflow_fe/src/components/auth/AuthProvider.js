import React, { useEffect, useState, createContext } from "react";
import { generateCodeVerifier, generateCodeChallenge } from "./pkceUtils";
import axios from "axios";
import PropTypes from "prop-types";

const CLIENT_ID = process.env.REACT_APP_STACK_APP_KEY;
const REDIRECT_URI =
  process.env.REACT_APP_AUTH_REDIRECT_URI || "http://localhost:3000/callback";
const AUTH_URL =
  process.env.REACT_APP_AUTH_URL || "https://stackoverflow.com/oauth";
const TOKEN_URL =
  process.env.REACT_APP_TOKEN_URL ||
  "https://stackoverflow.com/oauth/access_token/json";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const storedVerifier = localStorage.getItem("pkce_verifier");

    if (!token && code && storedVerifier) {
      exchangeToken(code, storedVerifier);
    }
  }, [token]);

  const login = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("pkce_verifier", verifier);

    const url = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=no_expiry&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`;
    window.location.href = url;
  };

  const exchangeToken = async (code, verifier) => {
    try {
      const response = await axios.post(TOKEN_URL, null, {
        params: {
          client_id: CLIENT_ID,
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: verifier,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data.access_token) {
        setToken(response.data.access_token);
        localStorage.setItem("token", response.data.access_token);
        window.history.replaceState(null, "", "/");
      }
    } catch (error) {
      console.error("Token exchange failed:", error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("pkce_verifier");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
