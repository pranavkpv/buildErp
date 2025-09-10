import { RejectEstimationApi } from "../../../api/Estimation"
import { useState } from "react"
import { toast } from "react-toastify"

interface prop {
   reasonOn: boolean
   setReasonOn: React.Dispatch<React.SetStateAction<boolean>>
   projectId: string
   onSuccess:()=>void
}

function ReasonModal({ reasonOn, setReasonOn, projectId,onSuccess }: prop) {
   if (!reasonOn) return null
   const [reason, setReason] = useState("")

   const submitReasonFun = async () => {
      const response = await RejectEstimationApi({ reason, projectId })
      if (response.success) {
         toast.success(response.message)
         onSuccess()
         setReasonOn(false)
      } else {
         toast.error(response.message)
      }
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <p className="text-lg font-medium text-gray-800 mb-4">
               Please provide a reason for rejecting the estimation
            </p>
            <input
               type="text"
               value={reason}
               onChange={(e) => setReason(e.target.value)}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
               placeholder="Enter reason here"
            />
            <div className="flex justify-end space-x-4">
               <button
                  onClick={() => setReasonOn(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
               >
                  Cancel
               </button>
               <button
                  onClick={submitReasonFun}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
               >
                  Submit
               </button>
            </div>
         </div>
      </div>
   )
}

export default ReasonModal