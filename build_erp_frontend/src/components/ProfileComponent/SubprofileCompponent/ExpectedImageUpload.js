import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { useState } from "react";
import { uploadProjectImageUserAPI } from "../../../api/Estimation";
import { ImagePlus, X, Trash2, Layers, Loader2 } from "lucide-react";
function ExpectedImageUpload({ uploadEnable, setUploadEnable, uploadProjectId }) {
    const [estimatedImages, setEstimatedImages] = useState([{ title: "", file: null }]);
    const [loadOn, setLoadOn] = useState(false);
    if (!uploadEnable)
        return null;
    const handleImageChange = (index, field, value) => {
        setEstimatedImages((prev) => {
            const newImages = [...prev];
            newImages[index] = { ...newImages[index], [field]: value };
            return newImages;
        });
    };
    const addImageField = () => {
        setEstimatedImages([...estimatedImages, { title: "", file: null }]);
    };
    const removeImageField = (index) => {
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
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-10" }), loadOn && (_jsxs("div", { className: "absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3", children: [_jsx(Loader2, { className: "w-8 h-8 text-orange-500 animate-spin" }), _jsx("span", { className: "font-mono text-xs font-black text-slate-300 uppercase tracking-widest", children: "Pushing Asset Manifest..." })] })), _jsx("button", { onClick: () => {
                        setUploadEnable(false);
                        setEstimatedImages([{ title: "", file: null }]);
                    }, "aria-label": "Close image upload modal", className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors z-10", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx("div", { className: "p-6 sm:p-8 pb-4 border-b border-slate-850 shrink-0", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(ImagePlus, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Upload Project Blueprint Images" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Asset Allocation File Pipeline" })] })] }) }), _jsxs("div", { className: "p-6 sm:p-8 pt-4 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-slate-300", children: [estimatedImages.map((image, index) => (_jsxs("div", { className: "bg-slate-950/40 border border-slate-850/60 rounded-xl p-4 relative group", children: [_jsxs("div", { className: "flex items-center justify-between mb-3 pb-2 border-b border-slate-850", children: [_jsxs("span", { className: "font-mono text-[10px] font-black text-slate-500 uppercase tracking-wider", children: ["[ NODE ", (index + 1).toString().padStart(2, '0'), " ]"] }), estimatedImages.length > 1 && (_jsxs("button", { onClick: () => removeImageField(index), className: "text-red-400/80 hover:text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1", children: [_jsx(Trash2, { className: "w-3 h-3" }), " Delete"] }))] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: `title-${index}`, className: "block text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1.5", children: "Asset Specification Reference Title" }), _jsx("input", { type: "text", id: `title-${index}`, value: image.title, onChange: (e) => handleImageChange(index, "title", e.target.value), placeholder: "e.g., Foundation Framework Elevation", className: "w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-200 text-xs font-mono font-bold placeholder:text-slate-700 transition-colors" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: `file-upload-${index}`, className: "block text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider mb-1.5", children: "Target Static Image File Binary" }), _jsx("input", { id: `file-upload-${index}`, type: "file", accept: "image/*", onChange: (e) => handleImageChange(index, "file", e.target.files?.[0] || null), className: "w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-slate-400 text-xs font-mono focus:outline-none focus:border-orange-500/50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-orange-500 file:text-slate-950 file:font-mono file:text-[11px] file:font-black file:uppercase file:tracking-wider file:hover:bg-orange-600 file:cursor-pointer transition-colors" })] })] })] }, index))), _jsxs("button", { onClick: addImageField, className: "w-full py-3 bg-slate-950 hover:bg-slate-950/80 border border-dashed border-slate-800 hover:border-orange-500/40 text-orange-500 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2", children: [_jsx(Layers, { className: "w-3.5 h-3.5" }), " + Append Image Asset Node"] })] }), _jsxs("div", { className: "p-6 border-t border-slate-850 bg-slate-950/30 flex flex-col sm:flex-row justify-end gap-2 shrink-0", children: [_jsx("button", { type: "button", className: "w-full sm:w-auto px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors order-2 sm:order-1", onClick: () => {
                                setUploadEnable(false);
                                setEstimatedImages([{ title: "", file: null }]);
                            }, children: "Abort Dispatch" }), _jsx("button", { type: "button", className: "w-full sm:w-auto px-5 py-2.5 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors order-1 sm:order-2", onClick: uploadImageFun, children: "Commit Matrix Upload" })] })] }) }));
}
export default ExpectedImageUpload;
