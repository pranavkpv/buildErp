import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';
const AdminBackloginprotected = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        if (decoded.role == "admin") {
            return _jsx(Navigate, { to: "/admin/dashboard" });
        }
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminBackloginprotected;
