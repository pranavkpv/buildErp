import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getEstimationImageApi } from "../../../api/Estimation";
import Loading from "../../../components/Loading";
import { X } from "lucide-react";

type UploadProp = {
  uploadEnable: boolean;
  setUploadEnable: React.Dispatch<React.SetStateAction<boolean>>;
  uploadProjectId: string;
};

type ExistImage = {
  title: string;
  image: string;
};

function ProjectImageUpload({ uploadEnable, setUploadEnable, uploadProjectId }: UploadProp) {
  if (!uploadEnable) return null;

  const [existImages, setExistImages] = useState<ExistImage[]>([]);
  const [loadOn, setLoadOn] = useState(false);

  const fetchExistImage = async () => {
    try {
      setLoadOn(true);
      const response = await getEstimationImageApi(uploadProjectId);
      setLoadOn(false);
      if (response.success) {
        setExistImages(response.data);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed to fetch existing images");
    }
  };

  useEffect(() => {
    fetchExistImage();
  }, [uploadProjectId]);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="relative bg-gray-900 text-gray-100 rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 border border-gray-700">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100">Project Images</h2>
            <button
              onClick={() => setUploadEnable(false)}
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>
          </div>

          {/* Existing Images */}
          {existImages.length > 0 ? (
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-300">Existing Images</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[50vh] overflow-y-auto pr-2">
                {existImages.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition"
                  >
                    <h4 className="text-sm font-medium text-gray-300 mb-2 text-center truncate">
                      {item.title}
                    </h4>
                    <div className="w-full h-40 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">
              No existing images found.
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setUploadEnable(false)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <Loading loadOn={loadOn} />
    </>
  );
}

export default ProjectImageUpload;
