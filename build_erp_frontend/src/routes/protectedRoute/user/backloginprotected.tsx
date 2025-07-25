import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

const Backloginprotected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const decoded = jwtDecode<TokenPayload>(accessToken);
    if (decoded.role == "user") {
      return <Navigate to="/" replace />;
    }
  }
  return <>{children}</>;

};

export default Backloginprotected;
