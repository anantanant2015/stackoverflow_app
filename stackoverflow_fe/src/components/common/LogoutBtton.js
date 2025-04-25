import React from "react";
import { useAuth } from "../auth/useAuth";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return <button onClick={logout}>Logout</button>;
};
