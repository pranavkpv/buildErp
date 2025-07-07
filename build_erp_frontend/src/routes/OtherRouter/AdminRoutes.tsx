// src/routes/adminRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Adminlogin from "../../pages/Admin/Adminlogin";
import Adminlayout from "../../pages/Admin/Adminlayout";
import Dashboard from "../../components/Admin/Dashboard";
import Category from "../../components/Category/Category";
import Unit from "../../components/Unit/Unit";
import Brand from "../../components/Brand/Brand";
import Project from "../../components/ProjectRegister/Projectlist";
import Material from "../../components/Material/Material";
import Labourlist from "../../components/Labour/Labourlist";
import SitemanagerList from "../../components/Sitemanager/SitemanagerList";
import ListSiteToProject from "../../components/AddSiteToproject/ListSiteToproject";
import AdminBackloginprotected from "../protectedRoute/admin/backloginprotected";
import AdminbackDashprotected from "../../routes/protectedRoute/admin/backDashprotected";
import SpecList from "../../components/Specification/SpecList";
import ListEstimation from "../../components/Estimation/ListEstimation";
import ListStage from "../../components/StageSet/Stageset";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          <AdminBackloginprotected>
            <Adminlogin />
          </AdminBackloginprotected>
        }
      />
      <Route path="/admin" element={<Adminlayout />}>
        <Route path="dashboard" element={<AdminbackDashprotected><Dashboard /></AdminbackDashprotected>} />
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
      </Route>
    </Routes>
  );
};