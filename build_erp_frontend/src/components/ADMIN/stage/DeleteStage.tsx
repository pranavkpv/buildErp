import { stageDeleteAPI } from "../../../api/Admin/StageSetting";
import { toast } from "react-toastify";


type ProjectProp = {
   enable: boolean;
   deleteId: string;
   setEnable: React.Dispatch<React.SetStateAction<boolean>>;
   onDeleteSuccess: () => void;
};

function DeleteStage({ enable, deleteId, setEnable, onDeleteSuccess }: ProjectProp) {
   if (!enable) return null
   const deleteStage = async () => {
          const response = await stageDeleteAPI(deleteId)
          if(response.success){
            toast.success(response.message)
            onDeleteSuccess()
            setEnable(false)
          }else{
            toast.error(response.message)
          }
   }

   return (
      <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
         <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-100">Delete stage setting</h2>
            <p className="text-gray-200 text-sm font-medium">
               Are you sure you want to delete this project stage setting?
            </p>
            <div className="flex justify-center gap-4">
               <button
                  onClick={() => setEnable(false)}
                  className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
               >
                  Cancel
               </button>
               <button
                  onClick={deleteStage}
                  className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
               >
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
}

export default DeleteStage;