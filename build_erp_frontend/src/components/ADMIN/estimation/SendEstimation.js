import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { SendEstimationApi } from "../../../api/Estimation";
import Loading from "../../../components/Loading";
import { useState } from "react";
function SendEstimation({ sendEnable, setSendEnable, projectId, onSendSuccess, }) {
    const [loadOn, setLoadOn] = useState(false);
    const sendEstimation = async () => {
        setLoadOn(true);
        const resultData = await SendEstimationApi(projectId);
        setLoadOn(false);
        if (resultData.success) {
            toast.success(resultData.message);
            setSendEnable(false);
            onSendSuccess();
        }
        else {
            toast.error(resultData.message);
        }
    };
    if (!sendEnable)
        return null;
    return (_jsx(_Fragment, { children: _jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "relative bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 text-center border border-gray-700/50", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(ExclamationTriangleIcon, { className: "h-16 w-16 text-red-500" }) }), _jsx("h2", { className: "text-2xl font-bold text-red-500 mb-3", children: "Confirm Send" }), _jsx("p", { className: "text-gray-300 mb-6", children: "Are you sure you want to send this estimation data?" }), _jsxs("div", { className: "flex justify-center gap-4 mt-6", children: [_jsx("button", { onClick: () => setSendEnable(false), className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 font-semibold", disabled: loadOn, children: "Cancel" }), _jsx("button", { onClick: sendEstimation, className: "bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 font-semibold", disabled: loadOn, children: "Send" })] }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none", children: _jsx(Loading, {}) }))] }) }) }));
}
export default SendEstimation;
