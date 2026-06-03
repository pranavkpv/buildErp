import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Header from "../../components/ADMIN/common/Header";
import Sidebar from "../../components/ADMIN/common/Sidebar";
import { Outlet } from "react-router-dom";
function Adminlayout() {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "h-screen flex flex-col", children: [_jsx("div", { className: "fixed top-0 left-0 right-0 z-50", children: _jsx(Header, {}) }), _jsxs("div", { className: "flex flex-1 pt-16", children: [" ", _jsx("div", { className: "fixed top-20 left-0 w-64 h-[calc(100vh-4rem)] bg-white z-40", children: _jsx(Sidebar, {}) }), _jsx("div", { className: "ml-60 flex-1 overflow-y-auto bg-gray-100 ", children: _jsx(Outlet, {}) })] })] }) }));
}
export default Adminlayout;
