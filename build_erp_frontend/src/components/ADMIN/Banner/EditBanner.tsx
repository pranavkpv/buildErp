import type { inputBannerInterface } from "ApiInterface/banner.interface";
import { editBannerApi } from "../../../api/banner";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

interface BannerEditProps {
  editData: inputBannerInterface;
  editEnable: boolean;
  setEnableEdit: (value: boolean) => void;
  onEditSuccess: () => void;
}

function BannerEdit({
  editData,
  editEnable,
  setEnableEdit,
  onEditSuccess,
}: BannerEditProps) {
  if (!editEnable) return null;
  const [title, setTitle] = useState(editData.title);
  const [subtitle, setSubtitle] = useState(editData.subtitle);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(editData.image);
  const [loadOn, setLoadOn] = useState(false);

  useEffect(() => {
    setTitle(editData.title);
    setSubtitle(editData.subtitle);
    setPreviewImage(editData.image);
    setFile(null);
  }, [editData.title, editData.subtitle, editData.image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    try {
      setLoadOn(true);
      const response = await editBannerApi({ id: editData._id, title, subtitle, file });
      if (response.success) {
        setLoadOn(false);
        toast.success(response.message);
        setTitle("");
        setSubtitle("");
        setFile(null);
        setPreviewImage("");
        onEditSuccess();
        setEnableEdit(false);
      } else {
        setLoadOn(false);
        toast.error(response.message);
      }
    } catch (error) {
      setLoadOn(false);
      toast.error("An error occurred while updating the banner");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="relative bg-gray-800/90 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50">
          <h2 className="text-xl font-semibold text-gray-100 mb-6">Edit Banner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
                disabled={loadOn}
              />
            </div>
            <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-300 mb-1">
                Subtitle
              </label>
              <input
                id="subtitle"
                type="text"
                placeholder="Enter subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
                disabled={loadOn}
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">
                Banner Image
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Banner preview"
                  className="h-20 w-32 object-cover rounded-md mb-2"
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.png";
                  }}
                />
              )}
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-100 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-teal-600 file:text-white file:hover:bg-teal-700 file:transition-all file:duration-200"
                disabled={loadOn}
              />
              {file && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected: {file.name}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setEnableEdit(false)}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm font-semibold"
                disabled={loadOn}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold"
                disabled={loadOn}
              >
                Update Banner
              </button>
            </div>
          </form>
          {loadOn && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BannerEdit;
