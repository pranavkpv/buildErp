import { Route, Routes } from "react-router-dom";
import Adminlogin from "../../pages/Admin/Adminlogin";
import Adminlayout from "../../pages/Admin/Adminlayout";
import Dashboard from "../../components/ADMIN/dashboard/Dashboard";
import Category from "../../components/CategoryComponent/Category";
import Brand from "../../components/BrandComponent/Brand";
import Project from "../../components/ADMIN/project/Projectlist";
import SitemanagerList from "../../components/ADMIN/sitemanager/SitemanagerList";
import ListSiteToProject from "../../components/ADMIN/AddSiteToproject/ListSiteToproject";
import AdminBackloginprotected from "../protectedRoute/admin/backloginprotected";
import AdminbackDashprotected from "../../routes/protectedRoute/admin/backDashprotected";
import ListEstimation from "../../components/ADMIN/estimation/ListEstimation";
import ListStage from "../../components/ADMIN/stage/Stageset";
import Material from "../../components/ADMIN/material/Material";
import Labourlist from "../../components/ADMIN/labour/Labourlist";
import SpecList from "../../components/ADMIN/Specification/SpecList";
import Unit from "../../components/UnitComponent/Unit";
import ListBanner from "../../components/ADMIN/Banner/ListBanner";
import NotFound from "../../components/NotFound";
import AdminProjectList from "../../components/ADMIN/dashboard/AdminProjectList";
import AdminProjectDetails from "../../components/ADMIN/dashboard/AdminProjectDetails";
import VerifyPayment from "../../components/ADMIN/stage/VerifyPayment";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AdminBackloginprotected>
            <Adminlogin />
          </AdminBackloginprotected>
        }
      />

      <Route path="/" element={<Adminlayout />}>
        <Route path="dashboard" element={<AdminbackDashprotected><Dashboard /></AdminbackDashprotected>} />
        <Route path="ProjectList" element={<AdminbackDashprotected><AdminProjectList /></AdminbackDashprotected>} />
        <Route path="projectDetails" element={<AdminbackDashprotected><AdminProjectDetails /></AdminbackDashprotected>} />
        <Route path="banner" element={<AdminbackDashprotected><ListBanner /></AdminbackDashprotected>} />
        <Route path="project" element={<AdminbackDashprotected><Project /></AdminbackDashprotected>} />
        <Route path="category" element={<AdminbackDashprotected><Category /></AdminbackDashprotected>} />
        <Route path="unit" element={<AdminbackDashprotected><Unit /></AdminbackDashprotected>} />
        <Route path="brand" element={<AdminbackDashprotected><Brand /></AdminbackDashprotected>} />
        <Route path="material" element={<AdminbackDashprotected><Material /></AdminbackDashprotected>} />
        <Route path="Labour" element={<AdminbackDashprotected><Labourlist /></AdminbackDashprotected>} />
        <Route path="Sitemanager" element={<AdminbackDashprotected><SitemanagerList /></AdminbackDashprotected>} />
        <Route path="addToSite" element={<AdminbackDashprotected><ListSiteToProject /></AdminbackDashprotected>} />
        <Route path="spec" element={<AdminbackDashprotected><SpecList /></AdminbackDashprotected>} />
        <Route path="estimation" element={<AdminbackDashprotected><ListEstimation /></AdminbackDashprotected>} />
        <Route path="stage" element={<AdminbackDashprotected><ListStage /></AdminbackDashprotected>} />
        <Route path="verify" element={<AdminbackDashprotected><VerifyPayment /></AdminbackDashprotected>} />
      </Route>
         <Route path="*" element={<NotFound />} />
    </Routes>
  );
};