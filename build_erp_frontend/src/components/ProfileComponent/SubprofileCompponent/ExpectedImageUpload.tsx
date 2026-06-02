import { toast } from "react-toastify";
import { useState } from "react";
import type { estimatedImage } from "../../../ApiInterface/estimation.interface";
import { uploadProjectImageUserAPI } from "../../../api/Estimation";
import { ImagePlus, X, Trash2, Layers, Loader2 } from "lucide-react";

type uploadProp = {
  uploadEnable: boolean;
  setUploadEnable: React.Dispatch<React.SetStateAction<boolean>>;
  uploadProjectId: string;
};

function ExpectedImageUpload({ uploadEnable, setUploadEnable, uploadProjectId }: uploadProp) {
  const [estimatedImages, setEstimatedImages] = useState<estimatedImage[]>([{ title: "", file: null }]);
  const [loadOn, setLoadOn] = useState(false);

  if (!uploadEnable) return null;

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

    setLoadOn(true);
    const response = await uploadProjectImageUserAPI(uploadProjectId, estimatedImages);
    setLoadOn(false);
    if (response.success) {
      toast.success(response.message);
      setUploadEnable(false);
      setEstimatedImages([{ title: "", file: null }]);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white">
      <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Structural Orange Ribbon Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-10" />

        {/* Global Modal Loader Overlay */}
        {loadOn && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <span className="font-mono text-xs font-black text-slate-300 uppercase tracking-widest">
              Pushing Asset Manifest...
            </span>
          </div>
        )}

        {/* Close Window Anchor */}
        <button
          onClick={() => {
            setUploadEnable(false);
            setEstimatedImages([{ title: "", file: null }]);
          }}
          aria-label="Close image upload modal"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Panel Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0">
              <ImagePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Upload Project Blueprint Images
              </h2>
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Asset Allocation File Pipeline
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Image Field Record Stack */}
        <div className="p-6 sm:p-8 pt-4 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-slate-300">
          {estimatedImages.map((image, index) => (
            <div 
              key={index} 
              className="bg-slate-950/40 border border-slate-850/60 rounded-xl p-4 relative group"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-850">
                <span className="font-mono text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  [ NODE {(index + 1).toString().padStart(2, '0')} ]
                </span>
                {estimatedImages.length > 1 && (
                  <button
                    onClick={() => removeImageField(index)}
                    className="text-red-400/80 hover:text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor={`title-${index}`}
                    className="block text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Asset Specification Reference Title
                  </label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    value={image.title}
                    onChange={(e) => handleImageChange(index, "title", e.target.value)}
                    placeholder="e.g., Foundation Framework Elevation"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-200 text-xs font-mono font-bold placeholder:text-slate-700 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`file-upload-${index}`}
                    className="block text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1.5"
                  >
                    Target Static Image File Binary
                  </label>
                  <input
                    id={`file-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, "file", e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-400 text-xs font-mono focus:outline-none focus:border-orange-500/50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-orange-500 file:text-slate-950 file:font-mono file:text-[11px] file:font-black file:uppercase file:tracking-wider file:hover:bg-orange-600 file:cursor-pointer transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Append Entry Line Action */}
          <button
            onClick={addImageField}
            className="w-full py-3 bg-slate-950 hover:bg-slate-950/80 border border-dashed border-slate-800 hover:border-orange-500/40 text-orange-500 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-3.5 h-3.5" /> + Append Image Asset Node
          </button>
        </div>

        {/* Modal Master Operational Footer Actions */}
        <div className="p-6 border-t border-slate-850 bg-slate-950/30 flex flex-col sm:flex-row justify-end gap-2 shrink-0">
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors order-2 sm:order-1"
            onClick={() => {
              setUploadEnable(false);
              setEstimatedImages([{ title: "", file: null }]);
            }}
          >
            Abort Dispatch
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors order-1 sm:order-2"
            onClick={uploadImageFun}
          >
            Commit Matrix Upload
          </button>
        </div>

      </div>
    </div>
  );
}

export default ExpectedImageUpload;