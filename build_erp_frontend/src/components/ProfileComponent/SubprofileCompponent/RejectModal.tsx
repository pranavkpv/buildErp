interface prop {
   rejectOn: boolean
   setRejectOn: React.Dispatch<React.SetStateAction<boolean>>
   setReasonOn: React.Dispatch<React.SetStateAction<boolean>>
}

function RejectModal({ rejectOn, setRejectOn, setReasonOn }: prop) {
   if (!rejectOn) return null
   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <p className="text-lg font-medium text-gray-800 mb-6">
               Are you sure you want to reject the estimated data?
            </p>
            <div className="flex justify-end space-x-4">
               <button
                  onClick={() => setRejectOn(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
               >
                  Cancel
               </button>
               <button
                  onClick={() => {
                     setReasonOn(true)
                     setRejectOn(false)
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
               >
                  Confirm
               </button>
            </div>
         </div>
      </div>
   )
}

export default RejectModal