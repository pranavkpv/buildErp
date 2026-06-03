import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { rejectTransferApi } from "../../../api/Sitemanager/transfer";
import { toast } from "react-toastify";
import { RadioTower, X } from "lucide-react";
function RejectTransfer({ rejectId, setRejectEnable, rejectEnable, onRejectSuccess, setActionEnable }) {
    if (!rejectEnable || !rejectId)
        return null;
    const rejectFun = async (targetId) => {
        try {
            const response = await rejectTransferApi(targetId);
            if (response.success) {
                toast.success(response.message);
                setRejectEnable(false);
                setActionEnable(false);
                onRejectSuccess();
            }
            else {
                toast.error(response.message || "Failed to reject transfer");
            }
        }
        catch (error) {
            toast.error("An error occurred while rejecting the transfer");
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-red-500 selection:text-white animate-in fade-in duration-100", children: _jsxs("div", { className: "relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600" }), _jsx("button", { type: "button", onClick: () => setRejectEnable(false), className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", "aria-label": "Abort transmission cancellation", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8 text-center", children: [_jsx("div", { className: "mx-auto w-12 h-12 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 mb-4 animate-pulse", children: _jsx(RadioTower, { className: "w-6 h-6" }) }), _jsx("h2", { id: "modal-title", className: "text-sm font-mono font-black text-white uppercase tracking-wider mb-2", children: "Intercept Logistic Allocation" }), _jsxs("p", { className: "text-xs font-mono font-bold text-slate-400 leading-relaxed mb-6 px-4", children: ["Confirm terminal rejection for asset transfer node token ", _jsxs("span", { className: "text-red-400 font-mono", children: ["[", rejectId.slice(-6).toUpperCase(), "]"] }), "? This action is logged."] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { type: "button", className: "px-4 py-2.5 bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none", onClick: () => setRejectEnable(false), children: "Abort Void" }), _jsx("button", { type: "button", className: "px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-950/20 focus:outline-none", onClick: () => rejectFun(rejectId), children: "Void Transfer" })] })] })] }) }));
}
export default RejectTransfer;
