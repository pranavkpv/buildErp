import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

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
const BackLoginSitemanagerProtected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const decoded = jwtDecode<TokenPayload>(accessToken);
    if (decoded.role == "sitemanager") {
      return <Navigate to="/site/dashboard" />;
    }
  }
  return <>{children}</>;

};

export default BackLoginSitemanagerProtected
