import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/routes/sitemanagerRoutes.tsx
import { Route, Routes } from "react-router-dom";
import SiteLogin from "../../pages/Sitemanager/SiteLogin";
import SiteLayout from "../../pages/Sitemanager/SiteLayout";
import SiteDashboard from "../../components/SITEMANAGER/Dashboard/SiteDashboard";
import DisplaySitemanagerData from "../../components/SITEMANAGER/ChangepassSitemanager/DisplayData";
import BackLoginSitemanagerProtected from "../protectedRoute/sitemanager/blockLoginSitemanagerProtected";
import SiteBackDashProtected from "../../routes/protectedRoute/sitemanager/siteBackDashprotected";
import ListAttendance from "../../components/SITEMANAGER/Labour-attendance/listAttendance";
import StageUpdatePage from "../../components/SITEMANAGER/StageUpdate/stageupdatepage";
import PurchaseList from "../../components/SITEMANAGER/purchase/purchaselist";
import TransferList from "../../components/SITEMANAGER/Transfer/TransferList";
import ReceiveList from "../../components/SITEMANAGER/Receive/ReceiveList";
import SiteChatList from "../../components/SITEMANAGER/Chat/SiteChatList";
import NotFound from "../../components/NotFound";
export const SitemanagerRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(BackLoginSitemanagerProtected, { children: _jsx(SiteLogin, {}) }) }), _jsxs(Route, { path: "/", element: _jsx(SiteLayout, {}), children: [_jsx(Route, { path: "dashboard", element: _jsx(SiteBackDashProtected, { children: _jsx(SiteDashboard, {}) }) }), _jsx(Route, { path: "changepass", element: _jsx(SiteBackDashProtected, { children: _jsx(DisplaySitemanagerData, {}) }) }), _jsx(Route, { path: "stage-updation", element: _jsx(SiteBackDashProtected, { children: _jsx(StageUpdatePage, {}) }) }), _jsx(Route, { path: "attendance", element: _jsx(SiteBackDashProtected, { children: _jsx(ListAttendance, {}) }) }), _jsx(Route, { path: "purchase", element: _jsx(SiteBackDashProtected, { children: _jsx(PurchaseList, {}) }) }), _jsx(Route, { path: "transfer", element: _jsx(SiteBackDashProtected, { children: _jsx(TransferList, {}) }) }), _jsx(Route, { path: "receive", element: _jsx(SiteBackDashProtected, { children: _jsx(ReceiveList, {}) }) }), _jsx(Route, { path: "chat", element: _jsx(SiteBackDashProtected, { children: _jsx(SiteChatList, {}) }) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
};
