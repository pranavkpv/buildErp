
import SiteSidebar from "../../components/SitemanagerDash/siteSidebar"
import { Outlet } from "react-router-dom";
import SiteHeader from "../../components/SitemanagerDash/SiteHeader"

function SiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex flex-1">
        <SiteSidebar /> 
        <main className="flex-1  bg-[rgb(3_7_24_/_92%)] min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SiteLayout;