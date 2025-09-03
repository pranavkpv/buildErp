// src/routes/sitemanagerRoutes.tsx
import { Route, Routes } from "react-router-dom";
import SiteLogin from "../../pages/Sitemanager/SiteLogin";
import SiteLayout from "../../pages/Sitemanager/SiteLayout";
import SiteDashboard from "../../pages/Sitemanager/SiteDashboard";
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
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <BackLoginSitemanagerProtected>
            <SiteLogin />
          </BackLoginSitemanagerProtected>
        }
      />
      <Route path="/" element={<SiteLayout />}>
        <Route path="dashboard" element={<SiteBackDashProtected><SiteDashboard /></SiteBackDashProtected>} />
        <Route path="changepass" element={<SiteBackDashProtected><DisplaySitemanagerData /></SiteBackDashProtected>} />
        <Route path="stage-updation" element={<SiteBackDashProtected><StageUpdatePage /></SiteBackDashProtected>} />
        <Route path = "attendance" element={<SiteBackDashProtected><ListAttendance /></SiteBackDashProtected>} />
        <Route path="purchase" element={<SiteBackDashProtected><PurchaseList /></SiteBackDashProtected>} />
        <Route path="transfer" element={<SiteBackDashProtected><TransferList /></SiteBackDashProtected>} />
        <Route path="receive" element={<SiteBackDashProtected><ReceiveList /></SiteBackDashProtected>} />
        <Route path="chat" element={<SiteBackDashProtected><SiteChatList /></SiteBackDashProtected>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};