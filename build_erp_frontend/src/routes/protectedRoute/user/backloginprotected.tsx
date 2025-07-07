import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const Backloginprotected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken){
   return  <Navigate to="/" replace />;
  }
  return <>{children}</>;
  
};

export default Backloginprotected;
