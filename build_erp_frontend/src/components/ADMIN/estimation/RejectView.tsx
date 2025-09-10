interface prop {
   viewRejectOn: boolean
   setViewRejectOn: React.Dispatch<React.SetStateAction<boolean>>
   reason: string
}

function RejectView({ viewRejectOn, setViewRejectOn, reason }: prop) {
   if (!viewRejectOn) return null
   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h1 className="text-xl font-semibold text-gray-100 mb-4">
               Reason for Rejection
            </h1>
            <p className="text-sm text-gray-300 mb-6">
               {reason || "No reason provided"}
            </p>
            <div className="flex justify-end">
               <button
                  onClick={() => setViewRejectOn(false)}
                  className="px-4 py-2 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   )
}

export default RejectView