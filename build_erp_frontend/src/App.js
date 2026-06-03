import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserRoutes } from "./routes/OtherRouter/UserRoutes";
import { AdminRoutes } from "./routes/OtherRouter/AdminRoutes";
import { SitemanagerRoutes } from "./routes/OtherRouter/SitemanagerRoutes";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./Context/AppProvider";
import NotFound from "./components/NotFound";
import RequirementProvider from "./Context/RequirementProvider";
function App() {
    return (_jsx(_Fragment, { children: _jsx(AppProvider, { children: _jsxs(BrowserRouter, { children: [_jsx(RequirementProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/*", element: _jsx(UserRoutes, {}) }), _jsx(Route, { path: "admin/*", element: _jsx(AdminRoutes, {}) }), _jsx(Route, { path: "site/*", element: _jsx(SitemanagerRoutes, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }), _jsx(ToastContainer, {})] }) }) }));
}
export default App;
