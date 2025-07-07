import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const AdminbackDashprotected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if(!accessToken){
   return  <Navigate to="/admin/login"  />;
  }
  return <>{children}</>;
  
};

export default AdminbackDashprotected;
