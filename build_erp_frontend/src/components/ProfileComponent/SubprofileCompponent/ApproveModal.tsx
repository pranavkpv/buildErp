import { ApproveEstimationApi } from "../../../api/Estimation"
import { toast } from "react-toastify"

interface prop {
   approveOn: boolean
   setApproveOn: React.Dispatch<React.SetStateAction<boolean>>
   projectId: string
   onSuccess: () => void
}

function ApproveModal({ approveOn, setApproveOn, projectId, onSuccess }: prop) {
   if (!approveOn) return null

   const approveEstimationFun = async () => {
      const response = await ApproveEstimationApi(projectId)
      if (response.success) {
         toast.success(response.message)
         onSuccess();
         setApproveOn(false)
      } else {
         toast.error(response.message)
      }
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <p className="text-lg font-medium text-gray-800 mb-6">
               Are you sure you want to approve this estimation?
            </p>
            <div className="flex justify-end space-x-4">
               <button
                  onClick={() => setApproveOn(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
               >
                  Cancel
               </button>
               <button
                  onClick={approveEstimationFun}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
               >
                  Approve
               </button>
            </div>
         </div>
      </div>
   )
}

export default ApproveModal