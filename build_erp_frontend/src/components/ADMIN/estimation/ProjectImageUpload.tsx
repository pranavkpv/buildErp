import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { estimatedImage } from "../../../ApiInterface/estimation.interface";
import { uploadProjectImageAPI, getEstimationImageApi } from "../../../api/Estimation";

type uploadProp = {
  uploadEnable: boolean;
  setUploadEnable: React.Dispatch<React.SetStateAction<boolean>>;
  uploadProjectId: string;
};

type existImage = {
  title: string;
  image: string;
};

function ProjectImageUpload({ uploadEnable, setUploadEnable, uploadProjectId }: uploadProp) {
  if (!uploadEnable) return null;

  const [estimatedImages, setEstimatedImages] = useState<estimatedImage[]>([{ title: "", file: null }]);
  const [existImages, setExistImages] = useState<existImage[]>([]);

  const handleImageChange = (index: number, field: string, value: string | File | null) => {
    setEstimatedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], [field]: value };
      return newImages;
    });
  };

  const addImageField = () => {
    setEstimatedImages([...estimatedImages, { title: "", file: null }]);
  };

  const removeImageField = (index: number) => {
    if (estimatedImages.length > 1) {
      setEstimatedImages(estimatedImages.filter((_, i) => i !== index));
    }
  };

  const uploadImageFun = async () => {
    const isValid = estimatedImages.every((img) => img.title.trim() && img.file);
    if (!isValid) {
      toast.error("Please provide both title and image for all entries");
      return;
    }

    const response = await uploadProjectImageAPI(uploadProjectId, estimatedImages);
    if (response.success) {
      toast.success(response.message);
      setUploadEnable(false);
      setEstimatedImages([{ title: "", file: null }]);
      fetchExistImage(); // Refresh existing images after upload
    } else {
      toast.error(response.message);
    }
  };

  const fetchExistImage = async () => {
    try {
      const response = await getEstimationImageApi(uploadProjectId);
      if (response.success) {
        setExistImages(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch existing images");
    }
  };

  useEffect(() => {
    fetchExistImage();
  }, [uploadProjectId]);

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl border border-gray-700/50">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          Upload Project Images
        </h2>

        {/* Existing Images Section */}
        {existImages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Existing Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[30vh] overflow-y-auto pr-2">
              {existImages.map((element, index) => (
                <div
                  key={index}
                  className="bg-gray-700/50 p-4 rounded-lg flex flex-col items-center"
                >
                  <h4 className="text-sm font-medium text-gray-200 mb-2">{element.title}</h4>
                  <img
                    src={element.image}
                    alt={element.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload New Images Section */}
        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
          {estimatedImages.map((image, index) => (
            <div key={index} className="border-b border-gray-700/50 pb-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor={`title-${index}`}
                  className="block text-sm font-medium text-gray-200"
                >
                  Image Title {index + 1}
                </label>
                {estimatedImages.length > 1 && (
                  <button
                    onClick={() => removeImageField(index)}
                    className="text-red-400 hover:text-red-500 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                id={`title-${index}`}
                value={image.title}
                onChange={(e) => handleImageChange(index, "title", e.target.value)}
                placeholder="Enter image title"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
              />
              <input
                aria-label={`Image upload ${index + 1}`}
                id={`file-upload-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, "file", e.target.files?.[0] || null)}
                className="mt-3 w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-500 file:text-white file:hover:bg-teal-600 file:cursor-pointer"
              />
            </div>
          ))}
          <button
            onClick={addImageField}
            className="w-full py-2 bg-gray-700/50 text-teal-400 hover:bg-gray-600/50 rounded-lg text-sm font-medium transition-all duration-200"
          >
            + Add Another Image
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={() => {
              setUploadEnable(false);
              setEstimatedImages([{ title: "", file: null }]);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-teal-500/90 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
            onClick={uploadImageFun}
          >
            Upload Images
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectImageUpload;