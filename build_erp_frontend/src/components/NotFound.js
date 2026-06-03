import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen text-center bg-gray-100", children: [_jsx("h1", { className: "text-6xl font-bold text-red-500", children: "404" }), _jsx("p", { className: "text-xl mt-4 text-gray-700", children: "Oops! Page not found." }), _jsx("p", { className: "text-gray-500 mb-6", children: "The page you\u2019re looking for doesn\u2019t exist." }), _jsx(Link, { to: "/", className: "px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700", children: "Go Back Home" })] }));
};
export default NotFound;
