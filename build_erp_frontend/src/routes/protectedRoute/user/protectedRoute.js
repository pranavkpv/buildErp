import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ProtectedRoute = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        toast.error("please login the user");
        return _jsx(Navigate, { to: "/", replace: true });
    }
    const decoded = jwtDecode(accessToken);
    if (decoded.role != "user") {
        toast.error("please login the user");
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
