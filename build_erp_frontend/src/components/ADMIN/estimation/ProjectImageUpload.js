import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getEstimationImageApi } from "../../../api/Estimation";
import Loading from "../../../components/Loading";
import { X } from "lucide-react";
function ProjectImageUpload({ uploadEnable, setUploadEnable, uploadProjectId }) {
    if (!uploadEnable)
        return null;
    const [existImages, setExistImages] = useState([]);
    const [loadOn, setLoadOn] = useState(false);
    const fetchExistImage = async () => {
        try {
            setLoadOn(true);
            const response = await getEstimationImageApi(uploadProjectId);
            setLoadOn(false);
            if (response.success) {
                setExistImages(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch {
            setLoadOn(false);
            toast.error("Failed to fetch existing images");
        }
    };
    useEffect(() => {
        fetchExistImage();
    }, [uploadProjectId]);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "relative bg-gray-900 text-gray-100 rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 border border-gray-700", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-100", children: "Project Images" }), _jsx("button", { onClick: () => setUploadEnable(false), className: "text-gray-400 hover:text-gray-200 transition-colors", "aria-label": "Close modal", disabled: loadOn, children: _jsx(X, { size: 22 }) })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-50", children: _jsx(Loading, {}) })), !loadOn && (_jsx(_Fragment, { children: existImages.length > 0 ? (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-4 text-gray-300", children: "Existing Images" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[50vh] overflow-y-auto pr-2", children: existImages.map((item, index) => (_jsxs("div", { className: "bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition", children: [_jsx("h4", { className: "text-sm font-medium text-gray-300 mb-2 text-center truncate", children: item.title }), _jsx("div", { className: "w-full h-40 rounded-lg overflow-hidden", children: _jsx("img", { src: item.image, alt: item.title, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-300" }) })] }, index))) })] })) : (_jsx("div", { className: "text-center text-gray-400 py-10", children: "No existing images found." })) })), _jsx("div", { className: "mt-8 flex justify-end", children: _jsx("button", { onClick: () => setUploadEnable(false), className: "px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition", disabled: loadOn, children: "Close" }) })] }) }) }));
}
export default ProjectImageUpload;
