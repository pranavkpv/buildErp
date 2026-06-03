import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import SiteSidebar from "../../components/SITEMANAGER/common/siteSidebar";
import { Outlet } from "react-router-dom";
import SiteHeader from "../../components/SITEMANAGER/common/SiteHeader";
function SiteLayout() {
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(SiteHeader, {}), _jsxs("div", { className: "flex flex-1", children: [_jsx(SiteSidebar, {}), _jsx("main", { className: "flex-1  bg-[rgb(3_7_24_/_92%)] min-h-screen", children: _jsx(Outlet, {}) })] })] }));
}
export default SiteLayout;
