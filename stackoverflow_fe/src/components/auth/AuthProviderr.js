import React, { useEffect, useState, createContext } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from './pkceUtils';
import axios from 'axios';

const CLIENT_ID = '<your_client_id>';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_URL = 'https://stackoverflow.com/oauth';
const TOKEN_URL = 'https://stackoverflow.com/oauth/access_token/json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const storedVerifier = localStorage.getItem('pkce_verifier');

    if (!token && code && storedVerifier) {
      exchangeToken(code, storedVerifier);
    }
  }, []);

  const login = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('pkce_verifier', verifier);

    const url = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=no_expiry&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`;
    window.location.href = url;
  };

  const exchangeToken = async (code, verifier) => {
    const response = await axios.post(TOKEN_URL, null, {
      params: {
        client_id: CLIENT_ID,
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      },
    });

    if (response.data.access_token) {
      setToken(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      window.history.replaceState(null, '', REDIRECT_URI);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('pkce_verifier');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
