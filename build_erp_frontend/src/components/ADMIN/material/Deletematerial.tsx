import { deleteMaterial } from "../../../api/Admin/material";
import axios from "axios";
import { toast } from "react-toastify";

type DeleteMaterialProp = {
  enable: boolean;
  deleteId: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

function DeleteMaterial({ enable, setEnable, deleteId, onDeleteSuccess }: DeleteMaterialProp) {
  const deleteMatData = async () => {
      const resultData = await deleteMaterial(deleteId)
      if (resultData.success) {
        toast.success(resultData.message);
        setEnable(false);
        onDeleteSuccess();
      } else {
        toast.error(resultData.message);
      }
  };

  if (!enable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center space-y-6 border border-gray-700/50">
        <h2 className="text-xl font-semibold text-gray-100">Confirm Deletion</h2>
        <p className="text-gray-300">Are you sure you want to delete this material? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={() => setEnable(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500/90 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={deleteMatData}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMaterial;