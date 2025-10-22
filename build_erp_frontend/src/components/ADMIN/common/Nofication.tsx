import { markReadApi } from "../../../api/notification"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Loading from "../../../components/Loading"
import { ArrowRight } from "lucide-react"

interface notificationData {
   _id: string
   date: Date,
   description: string
   userId: string
   read: boolean
   url: string
}
interface prop {
   isNotificationOpen: boolean
   setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>
   notification: notificationData[]
   displayNotification: () => void
}

function Notification({ isNotificationOpen, setIsNotificationOpen, notification, displayNotification }: prop) {
   if (!isNotificationOpen) {
      return null
   }

   const [view, setView] = useState<"unread" | "all">("unread")
   const [loading, setLoading] = useState(false)

   const markReadFun = async (Id: string) => {
      setLoading(true)
      const response = await markReadApi(Id)
      setLoading(false)
      if (response.success) {
         displayNotification()
      } else {
         toast.error(response.message)
      }
   }

   return (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
         <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-slate-700">
            <div className="p-6">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Notifications</h2>
                  <button
                     onClick={() => !loading && setIsNotificationOpen(false)}
                     className="text-slate-400 hover:text-white transition-colors"
                     disabled={loading}
                     aria-label="Close notifications"
                  >
                     ✕
                  </button>
               </div>
               <div className="flex space-x-4 mb-6">
                  <button
                     onClick={() => setView("unread")}
                     className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${ view === "unread"
                        ? "bg-orange-500 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                     disabled={loading}
                  >
                     Unread
                  </button>
                  <button
                     onClick={() => setView("all")}
                     className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${ view === "all"
                        ? "bg-orange-500 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                     disabled={loading}
                  >
                     All
                  </button>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-700">
                           <th className="py-3 px-4 text-sm font-medium text-slate-300">SL No</th>
                           <th className="py-3 px-4 text-sm font-medium text-slate-300">Date</th>
                           <th className="py-3 px-4 text-sm font-medium text-slate-300">Description</th>
                           <th className="py-3 px-4 text-sm font-medium text-slate-300">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {(view === "unread"
                           ? notification.filter((element) => !element.read)
                           : notification
                        ).map((item, index) => (
                           <tr
                              key={item._id}
                              className={`border-b border-slate-700 hover:bg-slate-600 ${ item.read ? "opacity-75" : ""
                                 }`}
                           >
                              <td className="py-3 px-4 text-sm text-slate-300">{index + 1}</td>
                              <td className="py-3 px-4 text-sm text-slate-300">
                                 {new Date(item.date).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-sm text-slate-300">{item.description}</td>
                              <td className="py-3 px-4">
                                 <div className="flex items-center gap-4">
                                    {!item.read && (
                                       <button
                                          onClick={() => !loading && markReadFun(item._id)}
                                          className="text-orange-500 hover:text-orange-600 text-xl font-medium transition-colors duration-200"
                                          title="Mark as Read"
                                          disabled={loading}
                                       >
                                          ✓
                                       </button>
                                    )}
                                    {item.read && (
                                       <span className="text-green-400 font-medium">Read</span>
                                    )}
                                    <Link
                                       to={item.url}
                                       onClick={() => !loading && setIsNotificationOpen(false)}
                                       aria-label={`Go to page for notification ${ index + 1 }`}
                                       className="text-slate-300 hover:text-orange-500 transition-colors duration-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                       <ArrowRight className="h-5 w-5" />
                                    </Link>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  {(view === "unread"
                     ? notification.filter((element) => !element.read).length === 0
                     : notification.length === 0) && (
                        <p className="text-center text-slate-400 py-4">
                           {view === "unread" ? "No unread notifications" : "No notifications available"}
                        </p>
                     )}
               </div>
            </div>
            {loading && (
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg pointer-events-none">
                  <Loading />
               </div>
            )}
         </div>
      </div>
   )
}

export default Notification
