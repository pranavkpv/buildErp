import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';
const AdminbackDashprotected = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return _jsx(Navigate, { to: "/admin/login" });
    }
    const decoded = jwtDecode(accessToken);
    if (decoded.role != "admin") {
        return _jsx(Navigate, { to: "/admin/login" });
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminbackDashprotected;
