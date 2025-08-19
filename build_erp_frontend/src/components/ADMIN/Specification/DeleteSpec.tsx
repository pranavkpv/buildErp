import { toast } from "react-toastify"
import AppContext from "../../../Context/AppContext"
import { useContext } from "react"
import { DeleteSpecFunction } from "../../../api/Specification"


type prop = {
  fetchSpecList:()=>void
}

function DeleteSpec({fetchSpecList}:prop) {
   const { deleteSpecEnable, setDeleteSpecEnable, deleteId } = useContext(AppContext)

   const deleteSpecData = async () => {
         const response = await DeleteSpecFunction(deleteId)
         if(response.success){
            toast.success(response.message)
            setDeleteSpecEnable(false)
            fetchSpecList()
         }else{
            toast.error(response.message)
         }
   }

   if (!deleteSpecEnable) return null
   return (
      <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
         <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 text-center">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Delete Site Manager</h2>
            <p className="text-gray-200 text-sm font-medium mb-6">
               Are you sure you want to delete this site manager?
            </p>
            <div className="flex justify-center gap-4">
               <button
                  onClick={() => {
                     setDeleteSpecEnable(false)
                  }}
                  className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
               >
                  Cancel
               </button>
               <button
                  onClick={deleteSpecData}
                  className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
               >
                  Delete
               </button>
            </div>
         </div>
      </div>
   )
}

export default DeleteSpec