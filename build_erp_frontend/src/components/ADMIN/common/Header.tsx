import {
   User,
   LogOut, 
   Search,
   HardHat,
   ChevronDown,
   Bell
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../api/Admin/dashboard';
import Notification from './Nofication';
import { fetchNotificationByUserApi } from '../../../api/notification';
import Loading from '../../../components/Loading';


interface notificationData {
   _id: string
   date: Date,
   description: string
   userId: string
   read: boolean
   url: string
}


function Header() {
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
   const [count, setCount] = useState(0)
   const [notification, setNotification] = useState<notificationData[]>([])
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()


   const logoutFun = async () => {
      const data = await adminLogout()
      if (data.success) {
         localStorage.removeItem("accessToken")
         toast.success(data.message)
         setTimeout(() => {
            navigate("/admin/login")
         }, 2000)
      }
   }


   const displayNotification = async () => {
      setLoading(true);
      const response = await fetchNotificationByUserApi()
      setLoading(false);
      if (response.success) {
         setNotification(response.data)
         setCount(response.data.filter((element: notificationData) => element.read === false).length)
      } else {
         toast.error(response.message)
      }
   }


   useEffect(() => {
      displayNotification()
   }, [])


   return (
      <header className="bg-gradient-to-r   from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700 relative">
         <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-md">
                     <HardHat className="w-8 h-8 text-white" />
                  </div>
                  <div>
                     <h1 className="text-2xl font-bold text-white tracking-tight">
                        Build<span className="text-orange-500">ERP</span>
                     </h1>
                     <p className="text-slate-400 text-sm font-medium">Admin Dashboard</p>
                  </div>
               </div>
            </div>
            <div className="flex items-center space-x-4">
               <div className="relative">
                  <button
                     onClick={() => !loading && setIsNotificationOpen(!isNotificationOpen)}
                     className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     disabled={loading}
                     aria-label="Toggle notifications"
                  >
                     <Bell className="w-6 h-6" />
                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {count}
                     </span>
                  </button>
                  {loading && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Loading />
                     </div>
                  )}
               </div>
               <div className="relative">
                  <button
                     onClick={() => setIsProfileOpen(!isProfileOpen)}
                     className="flex items-center space-x-3 p-2 hover:bg-slate-700 rounded-lg transition-colors"
                     aria-label="Toggle profile menu"
                  >
                     <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                     </div>
                     <div className="hidden md:block text-left">
                        <p className="text-white font-medium text-sm">Admin</p>
                     </div>
                     <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {isProfileOpen && (
                     <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-50">
                        <div className="p-4 border-b border-slate-200">
                           <p className="font-semibold text-slate-900">Admin</p>
                        </div>
                        <div className="py-2">
                           <hr className="my-2 border-slate-200" />
                           <button type="button" onClick={logoutFun}
                              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                           >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                           </button>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div className="md:hidden px-6 pb-4">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
               <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
               />
            </div>
         </div>
         <Notification
            isNotificationOpen={isNotificationOpen}
            setIsNotificationOpen={setIsNotificationOpen}
            notification={notification}
            displayNotification={displayNotification}
         />
      </header>
   );
}

export default Header;
