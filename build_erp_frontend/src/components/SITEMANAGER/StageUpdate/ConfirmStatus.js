import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../../components/Loading";
import { changeStatusStage } from "../../../api/Sitemanager/stageStatus";
import { useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../../../api/socket";
function ConfirmStatus({ statusEnable, editStageId, newProgress, setStatusEnable, onSuccess, onstatusSuccess, selectedProjectId, }) {
    if (!statusEnable)
        return null;
    const [date, setDate] = useState("");
    const [loadOn, setLoadOn] = useState(false);
    const confirmStageStatus = async () => {
        setLoadOn(true);
        const response = await changeStatusStage(editStageId, newProgress, date);
        setLoadOn(false);
        if (response.success) {
            socket.emit("userAddNotificationEventTrigger");
            toast.success(response.message);
            setStatusEnable(false);
            onSuccess();
            onstatusSuccess(selectedProjectId);
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50 p-4 sm:p-6", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700/50", children: [_jsx("h2", { className: "text-xl font-bold text-gray-100 mb-6 text-center", children: "Confirm Stage Status" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "statusDate", className: "block text-sm font-medium text-gray-200 mb-1", children: "Status Changed Date" }), _jsx("input", { id: "statusDate", type: "date", className: "w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm", placeholder: "Select status changed date", value: date, onChange: (e) => setDate(e.target.value), min: new Date().toISOString().split("T")[0] })] }), _jsxs("p", { className: "text-gray-200 text-sm font-medium text-center", children: ["Do you want to change the stage progress to ", _jsx("span", { className: "capitalize font-semibold text-teal-400", children: newProgress }), "?"] }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx("button", { type: "button", className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: () => setStatusEnable(false), children: "Cancel" }), _jsx("button", { type: "button", className: "bg-teal-500/90 hover:bg-teal-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", onClick: confirmStageStatus, children: "Confirm" })] })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default ConfirmStatus;
