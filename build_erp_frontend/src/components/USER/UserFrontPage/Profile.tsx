import UserHeader from "../common/UserHeader";
import Footer from "../common/Footer";
import SidebarUser from "../../ProfileComponent/SidebarUser";
import { Outlet, useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        {/* Main Application Header */}
        <UserHeader />

        {/* Structural Stripe Top Indicator Accent */}
        <div className="h-1.5 w-full animate-pulse"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #f97316, #f97316 10px, #1e293b 10px, #1e293b 20px)`
          }}
        />

        {/* Double Column Control Console Container */}
        <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-12">
          
          {/* User Profile Console Navigation Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 bg-slate-900 border-2 border-slate-800 rounded-2xl p-5 shadow-xl h-fit">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-4 px-2 border-b border-slate-800 pb-2">
              Navigation Terminal
            </div>
            <SidebarUser />
          </aside>

          {/* Dynamic Nested Route Viewport Display */}
          <main className="flex-1 bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            
            {/* Subtle internal industrial background watermark accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
            
            {/* Child Dynamic Content Interface Wrapper */}
            <div className="min-h-[calc(100vh-24rem)] relative z-10">
              <Outlet />
            </div>
          </main>

        </div>
      </div>

      {/* Main Application Footer */}
      <Footer />
    </div>
  );
}

export default Profile;