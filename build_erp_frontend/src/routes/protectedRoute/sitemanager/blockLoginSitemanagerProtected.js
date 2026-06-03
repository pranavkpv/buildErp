import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
const BackLoginSitemanagerProtected = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        if (decoded.role == "sitemanager") {
            return _jsx(Navigate, { to: "/site/dashboard" });
        }
    }
    return _jsx(_Fragment, { children: children });
};
export default BackLoginSitemanagerProtected;
