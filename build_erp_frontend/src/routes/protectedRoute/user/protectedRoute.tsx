import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    toast.error("please login the user")
    return <Navigate to="/" replace />;
  }
  const decoded = jwtDecode<TokenPayload>(accessToken);
  if (decoded.role != "user") {
    toast.error("please login the user")
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute 
