import { uploadEstimatImageAPI } from "../../../api/Admin/Estimation";
import { toast } from "react-toastify";

type uploadProp = {
  file: File | null;
  uploadEnable: boolean;
  setUploadEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  uploadProjectId: string;
  uploadSuccess: () => void;
};

function UploadConfirm({
  file,
  uploadEnable,
  setUploadEnable,
  setFile,
  uploadProjectId,
  uploadSuccess,
}: uploadProp) {
  if (!uploadEnable) return null;

  const fileUpload = async () => {
      const data = await uploadEstimatImageAPI(uploadProjectId, file);
      if (data.success) {
        toast.success(data.message);
        uploadSuccess();
        setUploadEnable(false);
      } else {
        toast.error(data.message);
      }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50 p-6 w-full max-w-md">
        <p className="text-gray-100 text-lg font-medium mb-6 text-center">
          Confirm to upload this image?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setUploadEnable(false);
              setFile(null);
            }}
            type="button"
            className="px-4 py-2 bg-gray-700/50 text-gray-100 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Cancel image upload"
          >
            Cancel
          </button>
          <button
            onClick={fileUpload}
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Confirm image upload"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadConfirm;