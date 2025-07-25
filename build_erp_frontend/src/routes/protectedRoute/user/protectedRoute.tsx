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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  const decoded = jwtDecode<TokenPayload>(accessToken);
  if(decoded.role!="user"){
     return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute 
