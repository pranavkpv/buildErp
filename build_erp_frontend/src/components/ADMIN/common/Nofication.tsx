import { markReadApi } from "../../../api/notification"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

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




   const markReadFun = async (Id: string) => {
      const response = await markReadApi(Id)
      if (response.success) {
         displayNotification()
      } else {
         toast.error(response.message)
      }
   }

   return (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
         <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-slate-700">
            <div className="p-6">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Notifications</h2>
                  <button
                     onClick={() => setIsNotificationOpen(false)}
                     className="text-slate-400 hover:text-white transition-colors"
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
                  >
                     Unread
                  </button>
                  <button
                     onClick={() => setView("all")}
                     className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${ view === "all"
                        ? "bg-orange-500 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
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
                                          onClick={() => markReadFun(item._id)}
                                          className="text-orange-500 hover:text-orange-600 text-xl font-medium transition-colors duration-200"
                                          title="Mark as Read"
                                       >
                                          ✓
                                       </button>
                                    )}
                                    {item.read && (
                                       <span className="text-green-400 font-medium">Read</span>
                                    )}
                                    <Link
                                       to={item.url}
                                       onClick={() => setIsNotificationOpen(false)}
                                       className="text-slate-300 hover:text-orange-500 underline transition-colors duration-200"
                                    >
                                       Move to Page
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
         </div>
      </div>
   )
}

export default Notification