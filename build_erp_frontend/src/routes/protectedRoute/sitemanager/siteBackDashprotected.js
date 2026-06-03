import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
const SiteBackDashProtected = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return _jsx(Navigate, { to: "/site/login" });
    }
    const decoded = jwtDecode(accessToken);
    if (decoded.role != "sitemanager") {
        return _jsx(Navigate, { to: "/site/login" });
    }
    return _jsx(_Fragment, { children: children });
};
export default SiteBackDashProtected;
