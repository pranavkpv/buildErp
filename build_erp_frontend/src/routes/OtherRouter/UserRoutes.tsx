import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/User/Signup";
import Otp from "../../pages/User/Otp";
import Login from "../../pages/User/Login";
import Backloginprotected from "../protectedRoute/user/backloginprotected";
import Home from "../../pages/User/Home";
import Projects from "../../pages/User/Project";
import Profile from "../../components/USER/UserFrontPage/Profile";
import ProjectDetails from "../../components/ProfileComponent/YourProjectDetails";
import OtpSend from "../../pages/User/OtpSend";
import ForgotOTP from "../../pages/User/ForgotOTP";
import NewPassword from "../../pages/User/NewPassword";
import DetailProject from "../../components/USER/UserFrontPage/ProjectDetails";
import ListProject from "../../components/USER/UserFrontPage/ListProjects";
import ProfileEdit from "../../components/ProfileComponent/ProfileEdit";
import ChangePassword from "../../components/ProfileComponent/ChangePassword";
import Chat from "../../components/ProfileComponent/Chat";
import NotFound from "../../components/NotFound";
import ProtectedRoute from "../../routes/protectedRoute/user/protectedRoute";
import ProjectProposal from "../../components/ProfileComponent/Proposal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Transfer from "../../components/ProfileComponent/Transfer";
import Wallet from "../../components/ProfileComponent/Wallet";

const stripePromise = loadStripe("pk_test_51S7bMD1P84WAbTJTerojk1ff5MKXMgAJX2YZ5XQPA1DJHsraJm1YSjr5oGTYRuDbyoSPakUJfx7FT7NMGJUVexwm00fPjEzze7")
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
      <Route path="/proposal" element={<ProtectedRoute><ProjectProposal /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} >
        <Route path="" element={<ProfileEdit />} />
        <Route path="project" element={<Elements stripe={stripePromise}><ProjectDetails /></Elements>} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="chat" element={<Chat />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="wallet" element={<Wallet />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};