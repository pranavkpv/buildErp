import Header from "../../components/ADMIN/common/Header";
import Sidebar from "../../components/ADMIN/common/Sidebar";
import { Outlet } from "react-router-dom";

function Adminlayout() {
   return (
      <>
         <div className="h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50">
               <Header />
            </div>

            <div className="flex flex-1 pt-16"> {/* pt-16 offsets the fixed header height */}
               {/* Fixed Sidebar */}
               <div className="fixed top-20 left-0 w-64 h-[calc(100vh-4rem)] bg-white z-40">
                  <Sidebar />
               </div>

               {/* Scrollable Content */}
               <div className="ml-60 flex-1 overflow-y-auto bg-gray-100 ">
                  <Outlet />
               </div>
            </div>
         </div>
      </>
   );
}

export default Adminlayout;
