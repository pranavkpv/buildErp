import { deleteSitemanagerData } from "../../../api/Admin/sitemanager";
import axios from "axios";
import { toast } from "react-toastify";

type DeleteDataProps = {
  deleteId: string;
  setDeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  deleteEnable: boolean;
  onDeleteSuccess: () => void;
};

function DeleteSitemanager({
  deleteEnable,
  setDeleteEnable,
  deleteId,
  onDeleteSuccess,
}: DeleteDataProps) {
  const deleteSitemanager = async () => {
      const resultData = await deleteSitemanagerData(deleteId)
      if (resultData.success) {
        toast.success(resultData.message);
        setDeleteEnable(false);
        onDeleteSuccess();
      } else {
        toast.error(resultData.message);
      }
  };

  if (!deleteEnable) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 text-center">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">Delete Site Manager</h2>
        <p className="text-gray-200 text-sm font-medium mb-6">
          Are you sure you want to delete this site manager?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteEnable(false)}
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={deleteSitemanager}
            className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSitemanager;