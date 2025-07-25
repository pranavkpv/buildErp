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

const AdminbackDashprotected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return <Navigate to="/admin/login" />;
  }
  const decoded = jwtDecode<TokenPayload>(accessToken);
  if (decoded.role != "admin") {
    return <Navigate to="/admin/login" />;
  }
  return <>{children}</>;

};

export default AdminbackDashprotected;
