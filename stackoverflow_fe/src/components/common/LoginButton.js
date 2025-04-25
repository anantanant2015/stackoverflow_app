// src/components/LoginButton.js
import React from "react";
import { generateCodeVerifier, generateCodeChallenge } from "../auth/pkceUtils";
import { Button } from "@mui/material";

export default function LoginButton() {
  const loginWithStackExchange = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    localStorage.setItem("pkce_code_verifier", codeVerifier);

    const params = new URLSearchParams({
      client_id: process.env.REACT_APP_STACK_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_STACK_REDIRECT_URI,
      response_type: "code",
      scope: "read_inbox",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    window.location.href = `https://stackoverflow.com/oauth?${params.toString()}`;
  };

  return (
    <Button variant="contained" onClick={loginWithStackExchange}>
      Login
    </Button>
  );
}
