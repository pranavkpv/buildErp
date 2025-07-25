
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserRoutes } from "./routes/OtherRouter/UserRoutes"
import { AdminRoutes } from "./routes/OtherRouter/AdminRoutes";
import { SitemanagerRoutes } from "./routes/OtherRouter/SitemanagerRoutes";
import "react-toastify/dist/ReactToastify.css"; 
import AppProvider from "./Context/AppProvider";

function App() {
  return (
    <>
    <AppProvider>
      <BrowserRouter>
        <UserRoutes />
        <AdminRoutes />
        <SitemanagerRoutes />
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
      
    </>
  );
}

export default App;