import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RejectView({ viewRejectOn, setViewRejectOn, reason }) {
    if (!viewRejectOn)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6", children: [_jsx("h1", { className: "text-xl font-semibold text-gray-100 mb-4", children: "Reason for Rejection" }), _jsx("p", { className: "text-sm text-gray-300 mb-6", children: reason || "No reason provided" }), _jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: () => setViewRejectOn(false), className: "px-4 py-2 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400", children: "Close" }) })] }) }));
}
export default RejectView;
