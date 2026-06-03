import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ApproveEstimationApi } from "../../../api/Estimation";
import { toast } from "react-toastify";
import { ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
function ApproveModal({ approveOn, setApproveOn, projectId, onSuccess }) {
    if (!approveOn)
        return null;
    const approveEstimationFun = async () => {
        const response = await ApproveEstimationApi(projectId);
        if (response.success) {
            toast.success(response.message);
            onSuccess();
            setApproveOn(false);
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-150", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-start gap-4 mb-6", children: [_jsx("div", { className: "p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 shrink-0", children: _jsx(ShieldAlert, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-white uppercase tracking-wider", children: "Authorization Required" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "System Evaluation Sign-off Request" })] })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsx("p", { className: "text-xs font-sans font-medium text-slate-300 leading-relaxed", children: "Are you sure you want to certify and lock this estimation framework into active project logs? This will initiate the subsequent downstream billing matrices." }), _jsxs("div", { className: "p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between", children: [_jsx("span", { className: "text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider", children: "Project ID Target" }), _jsxs("span", { className: "text-[11px] font-mono font-black text-orange-400 tracking-wider bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10 uppercase", children: [projectId.slice(-8), "..."] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-3 sm:gap-2", children: [_jsxs("button", { type: "button", onClick: () => setApproveOn(false), className: "w-full sm:w-auto px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5", children: [_jsx(XCircle, { className: "w-3.5 h-3.5 text-slate-500" }), "Abort Action"] }), _jsxs("button", { type: "button", onClick: approveEstimationFun, className: "w-full sm:w-auto px-4 py-2 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10", children: [_jsx(CheckCircle2, { className: "w-3.5 h-3.5" }), "Verify Approval"] })] })] })] }) }));
}
export default ApproveModal;
