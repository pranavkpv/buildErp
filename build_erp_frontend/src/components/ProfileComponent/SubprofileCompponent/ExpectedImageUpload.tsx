import { toast } from "react-toastify";
import { useState } from "react";
import type { estimatedImage } from "../../../ApiInterface/estimation.interface";
import {  uploadProjectImageUserAPI } from "../../../api/Estimation";

type uploadProp = {
  uploadEnable: boolean;
  setUploadEnable: React.Dispatch<React.SetStateAction<boolean>>;
  uploadProjectId: string;
};

function ExpectedImageUpload({ uploadEnable, setUploadEnable, uploadProjectId }: uploadProp) {
  if (!uploadEnable) return null;

  const [estimatedImages, setEstimatedImages] = useState<estimatedImage[]>([{ title: "", file: null }]);

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
    // Validate inputs
    const isValid = estimatedImages.every((img) => img.title.trim() && img.file);
    if (!isValid) {
      toast.error("Please provide both title and image for all entries");
      return;
    }



    const response = await uploadProjectImageUserAPI(uploadProjectId, estimatedImages);
    if (response.success) {
      toast.success(response.message);
      setUploadEnable(false);
      setEstimatedImages([{ title: "", file: null }]);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg border border-gray-700/50">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          Upload Project Images
        </h2>
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
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

export default ExpectedImageUpload;