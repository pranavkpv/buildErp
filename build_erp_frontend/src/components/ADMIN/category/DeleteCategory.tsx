import axios from "axios";
import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"; // Import the warning icon
import { deleteCategoryData } from "../../../api/Admin/category";

type CategoryProps = {
  enable: boolean;
  deleteId: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

function DeleteCategory({ enable, deleteId, setEnable, onDeleteSuccess }: CategoryProps) {
  const deleteCategory = async () => {
      const resultData = await deleteCategoryData(deleteId)
      if (resultData.success) {
        toast.success(resultData.message);
        setEnable(false); 
        onDeleteSuccess(); 
      } else {
        toast.error(resultData.message);
      }
  };

  if (!enable) return null; // Render nothing if the modal is not enabled

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center border border-gray-700/50">
        <div className="flex justify-center mb-4">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-red-500 mb-3">Confirm Deletion</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this category? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setEnable(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={deleteCategory}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory;