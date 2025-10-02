import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { deleteSitemanagerToProject } from "../../../api/Admin/addSiteToproject";
import Loading from "../../../components/Loading";
import { useState } from "react";


type DeleteSiteToProjectProps = {
  deleteEnable: boolean;
  deleteProjectId: string;
  deleteSiteManagerId: string;
  setDeleteEnable: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
};

function DeleteSiteToProject({
  deleteEnable,
  deleteProjectId,
  deleteSiteManagerId,
  setDeleteEnable,
  onDeleteSuccess,
}: DeleteSiteToProjectProps) {
  const [loadOn, setLoadOn] = useState(false)
  const deleteSiteAssignment = async () => {
    try {
      setLoadOn(true)
      const resultData = await deleteSitemanagerToProject(deleteProjectId, deleteSiteManagerId)
      if (resultData.success) {
        setLoadOn(false)

        toast.success(resultData.message || "Site assignment deleted successfully");
        setDeleteEnable(false);
        onDeleteSuccess();
      } else {
        setLoadOn(false)
        toast.error(resultData.message || "Failed to delete site assignment");
      }
    } catch (error) {
      setLoadOn(false)
    }
  };

  if (!deleteEnable) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center border border-gray-700/50 transform transition-all duration-300 scale-100">
          <div className="flex justify-center mb-4">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
          </div>
          <h2
            id="delete-modal-title"
            className="text-2xl font-bold text-red-500 mb-3"
          >
            Confirm Deletion
          </h2>
          <p
            id="delete-modal-description"
            className="text-gray-300 mb-6 text-sm font-medium"
          >
            Are you sure you want to delete this site assignment? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setDeleteEnable(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold text-sm"
              aria-label="Cancel deletion"
            >
              Cancel
            </button>
            <button
              onClick={deleteSiteAssignment}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold text-sm"
              aria-label="Confirm site assignment deletion"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Loading loadOn={loadOn} />
    </>
  );
}

export default DeleteSiteToProject;