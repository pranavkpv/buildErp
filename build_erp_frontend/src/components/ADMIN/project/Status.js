import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../../components/Loading";
import { pustStatusChange } from "../../../api/project";
import { toast } from "react-toastify";
import { useState } from "react";
function ChangeStatus({ project_id, status, enable, setEnable, onChangeSuccess }) {
    const [loadOn, setLoadOn] = useState(false);
    const statusChanged = async () => {
        setLoadOn(true);
        const _id = project_id;
        const data = await pustStatusChange(_id, status);
        setLoadOn(false);
        if (data.success) {
            toast.success(data.message);
            setEnable(false);
            onChangeSuccess();
        }
        else {
            toast.error(data.message);
        }
    };
    if (!enable)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50 text-center space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-100", children: "Change Status" }), _jsxs("p", { className: "text-gray-200 text-sm font-medium", children: ["Are you sure you want to change the status to ", status, "?"] }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: () => setEnable(false), className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", children: "Cancel" }), _jsx("button", { onClick: statusChanged, className: "bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", children: "Change" })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default ChangeStatus;
