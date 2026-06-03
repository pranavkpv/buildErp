import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Loading from "../../components/Loading";
import { useState } from "react";
function ReUsableDeleteModal({ enable, deleteId, setEnable, onDeleteSuccess, deleteItem, api }) {
    const [loadOn, setLoadOn] = useState(false);
    const deleteFunction = async () => {
        setLoadOn(true);
        try {
            const resultData = await api(deleteId);
            if (resultData.success) {
                setLoadOn(false);
                toast.success(resultData.message);
                setEnable(false);
                onDeleteSuccess();
            }
            else {
                setLoadOn(false);
                toast.error(resultData.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    if (!enable)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4", children: [_jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center border border-gray-700/50", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(ExclamationTriangleIcon, { className: "h-16 w-16 text-red-500" }) }), _jsx("h2", { className: "text-2xl font-bold text-red-500 mb-3", children: "Confirm Deletion" }), _jsxs("p", { className: "text-gray-300 mb-6", children: ["Are you sure you want to delete this ", deleteItem, "?"] }), _jsxs("div", { className: "flex justify-center gap-4 mt-6", children: [_jsx("button", { onClick: () => setEnable(false), className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold", children: "Cancel" }), _jsx("button", { onClick: deleteFunction, className: "bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold", children: "Delete" })] })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default ReUsableDeleteModal;
