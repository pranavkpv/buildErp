
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserRoutes } from "./routes/OtherRouter/UserRoutes"
import { AdminRoutes } from "./routes/OtherRouter/AdminRoutes";
import { SitemanagerRoutes } from "./routes/OtherRouter/SitemanagerRoutes";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <UserRoutes />
        <AdminRoutes />
        <SitemanagerRoutes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;