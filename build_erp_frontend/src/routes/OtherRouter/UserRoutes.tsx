// src/routes/userRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/User/Signup";
import Otp from "../../pages/User/Otp";
import Login from "../../pages/User/Login";

import Backloginprotected from "../protectedRoute/user/backloginprotected";
import Home from "../../pages/User/Home";
import Projects from "../../pages/User/Project";
import Profile from "../../components/UserFrontPage/Profile";
import ProjectProgress from "../../components/ProfileComponent/YourProject";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<Otp />} />
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
      <Route path="/profile" element={<Profile />} />
      <Route path="/sample" element = {<ProjectProgress />} />
    </Routes>
  );
};