import UserHeader from "../common/UserHeader";
import Footer from "../common/Footer";
import SidebarUser from "../../ProfileComponent/SidebarUser";
import { Outlet, useLocation } from "react-router-dom";


function Profile() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <UserHeader />

      <div className="flex flex-1 max-w-8xl  px-4 sm:px-6 lg:px-8 py-20">
        <SidebarUser />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="min-h-[calc(100vh-20rem)]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;