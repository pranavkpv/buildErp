import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
   children: React.ReactNode;
};
const SiteBackDashProtected: React.FC<ProtectedRouteProps> = ({ children }) => {
   const accessToken = localStorage.getItem('accessToken');
   if (!accessToken) {
      return <Navigate to="/site/login" />;
   }
   return <>{children}</>;

};

export default SiteBackDashProtected
