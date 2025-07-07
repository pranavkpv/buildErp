// src/routes/sitemanagerRoutes.tsx
import { Route, Routes } from "react-router-dom";
import SiteLogin from "../../pages/Sitemanager/SiteLogin";
import SiteLayout from "../../pages/Sitemanager/SiteLayout";
import SiteDashboard from "../../pages/Sitemanager/SiteDashboard";
import DisplaySitemanagerData from "../../components/ChangepassSitemanager/DisplayData";
import BackLoginSitemanagerProtected from "../protectedRoute/sitemanager/blockLoginSitemanagerProtected";
import SiteBackDashProtected from "../../routes/protectedRoute/sitemanager/siteBackDashprotected";
import StageUpdatePage from "../../components/StageUpdate/stageupdatepage";
import ListAttendance from "../../components/Labour-attendance/listAttendance";

export const SitemanagerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/site/login"
        element={
          <BackLoginSitemanagerProtected>
            <SiteLogin />
          </BackLoginSitemanagerProtected>
        }
      />
      <Route path="/site" element={<SiteLayout />}>
        <Route path="dashboard" element={<SiteBackDashProtected><SiteDashboard /></SiteBackDashProtected>} />
        <Route path="changepass" element={<SiteBackDashProtected><DisplaySitemanagerData /></SiteBackDashProtected>} />
        <Route path="stage-updation" element={<SiteBackDashProtected><StageUpdatePage /></SiteBackDashProtected>} />
        <Route path = "attendance" element={<SiteBackDashProtected><ListAttendance /></SiteBackDashProtected>} />
      </Route>
    </Routes>
  );
};