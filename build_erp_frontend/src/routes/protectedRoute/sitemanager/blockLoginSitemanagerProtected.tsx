import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};
const BackLoginSitemanagerProtected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken){
   return  <Navigate to="/site/dashboard"  />;
  }
  return <>{children}</>;
  
};

export default BackLoginSitemanagerProtected
