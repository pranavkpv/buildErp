import Header from "../../components/ADMIN/common/Header";
import Sidebar from "../../components/ADMIN/common/Sidebar";
import { Outlet } from "react-router-dom";
function Adminlayout() {
   return (
      <>
         <Header />
         <div className="flex">
            <Sidebar />
            <div className="flex-1  bg-gray-100 min-h-screen">
               <Outlet />
            </div>

         </div>
      </>
   )
}

export default Adminlayout;