import React from 'react';
import { useAuth } from '../auth/useAuth';

export const LoginButton = () => {
  const { login } = useAuth();
  return <button onClick={login}>Login with StackExchange</button>;
};
