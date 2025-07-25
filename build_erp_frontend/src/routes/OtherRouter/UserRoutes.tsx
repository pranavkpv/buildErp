// src/routes/userRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/User/Signup";
import Otp from "../../pages/User/Otp";
import Login from "../../pages/User/Login";

import Backloginprotected from "../protectedRoute/user/backloginprotected";
import Home from "../../pages/User/Home";
import Projects from "../../pages/User/Project";
import Profile from "../../components/USER/UserFrontPage/Profile";
import ProjectDetails from "../../components/ProfileComponent/YourProjectDetails";
import ContactUs from "../../components/ProfileComponent/ContactUs";
import OtpSend from "../../pages/User/OtpSend";
import ForgotOTP from "../../pages/User/ForgotOTP";
import NewPassword from "../../pages/User/NewPassword";
import DetailProject from "../../components/USER/UserFrontPage/ProjectDetails";
import ListProject from "../../components/USER/UserFrontPage/ListProjects";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/otpsend" element={<OtpSend />} />
      <Route path="/forgototp" element={<ForgotOTP />} />
      <Route path="/newPassword" element={<NewPassword />} />
      <Route
        path="/login"
        element={
          <Backloginprotected>
            <Login />
          </Backloginprotected>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/project" element={<Projects />} />
      <Route path="/projectDetail" element={<DetailProject />} />
      <Route path="/projectlist" element={<ListProject />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/profile" element={<Profile />} >
        <Route path="project" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
};