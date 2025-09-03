import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserRoutes } from "./routes/OtherRouter/UserRoutes"
import { AdminRoutes } from "./routes/OtherRouter/AdminRoutes";
import { SitemanagerRoutes } from "./routes/OtherRouter/SitemanagerRoutes";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./Context/AppProvider";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="admin/*" element={<AdminRoutes />} />
            <Route path="site/*" element={<SitemanagerRoutes />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AppProvider>

    </>
  );
}

export default App;