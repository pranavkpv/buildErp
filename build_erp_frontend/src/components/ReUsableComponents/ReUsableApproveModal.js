import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-toastify";
;
function ReUsableApproveModal({ approveId, setApproveEnable, approveEnable, onApproveSuccess, approveData, api, approveItem }) {
    if (!approveEnable)
        return null;
    const approveFun = async (approveId) => {
        if (!approveData) {
            return toast.error("Not Exist approved Data");
        }
        const response = await api(approveId, approveData);
        if (response.success) {
            toast.success(response.message);
            setApproveEnable(false);
            onApproveSuccess();
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50", children: [_jsx("h2", { className: "text-xl font-bold text-gray-100 mb-6 text-center", children: "Confirm Approve ?" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("p", { className: "text-gray-200 text-sm font-medium text-center", children: ["Do you want to approve this ", approveItem, "?"] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => setApproveEnable(false), children: "Cancel" }), _jsx("button", { type: "button", className: "bg-green-500/90 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => approveFun(approveId), children: "Approve" })] })] })] }) }));
}
export default ReUsableApproveModal;
