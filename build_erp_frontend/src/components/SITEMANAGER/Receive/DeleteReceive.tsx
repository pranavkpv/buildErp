import { deleteTransferAPI } from "../../../api/Sitemanager/transfer";
import { toast } from "react-toastify";

type deleteProp = {
  deleteId: string;
  onDeleteSuccess: () => void;
  setDeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  deleteEnable: boolean;
};
function DeleteReceive({ deleteId, onDeleteSuccess, deleteEnable, setDeleteEnable }: deleteProp) {
   if(!deleteEnable) return null
   const deleteTransferfun = async(deleteId:string)=>{
      const response = await deleteTransferAPI(deleteId)
      if(response.success){
         toast.success(response.message)
         setDeleteEnable(false)
         onDeleteSuccess()
      }else{
          toast.error(response.message)
      }
   }
   return (
      <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
         <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50">
            <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">
               Confirm Delete Transfer
            </h2>
            <div className="space-y-6">
               <p className="text-gray-200 text-sm font-medium text-center">
                  Do you want to delete this Transfer?
               </p>
               <div className="flex justify-end gap-4">
                  <button
                     type="button"
                     className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                     onClick={() => setDeleteEnable(false)}
                  >
                     Cancel
                  </button>
                  <button
                     type="button"
                     className="bg-red-500/90 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
                     onClick={() => deleteTransferfun(deleteId)}
                  >
                     Confirm
                  </button>
               </div>
            </div>
         </div>
      </div>

   )
}

export default DeleteReceive