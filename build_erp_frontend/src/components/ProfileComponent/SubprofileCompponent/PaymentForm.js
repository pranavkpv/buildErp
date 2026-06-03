import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { payFromWalletApi, stagePayApi } from "../../../api/User/Stage";
import { toast } from "react-toastify";
import { X, CreditCard, Wallet, Landmark } from "lucide-react";
function PaymentForm({ checkData, checkOn, setCheckOn }) {
    if (!checkOn || !checkData)
        return null;
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            toast.error("Stripe is not initialized");
            return;
        }
        try {
            const response = await stagePayApi(checkData._id, checkData.stage_amount);
            if (response.success) {
                window.location.href = response.data;
            }
            else {
                toast.error(response.message || "Failed to initiate payment");
            }
        }
        catch (error) {
            toast.error("An error occurred during payment");
        }
    };
    const payFromWalletFun = async () => {
        const response = await payFromWalletApi(checkData._id, checkData.stage_amount);
        if (response.success) {
            toast.success(response.message);
            setCheckOn(false);
        }
        else {
            toast.error(response.message);
            setCheckOn(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsx("button", { type: "button", onClick: () => setCheckOn(false), className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", "aria-label": "Close payment form", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(CreditCard, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Remittance Dispatch Form" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Financial Transaction Router" })] })] }), _jsxs("div", { className: "bg-slate-950 border border-slate-850/70 rounded-xl p-4 mb-6 font-mono text-xs", children: [_jsxs("div", { className: "flex justify-between gap-4 mb-1.5", children: [_jsx("span", { className: "text-slate-500 font-bold uppercase tracking-wider", children: "Target Phase:" }), _jsx("span", { className: "text-slate-200 font-bold uppercase", children: checkData.stage_name })] }), _jsxs("div", { className: "flex justify-between gap-4 pt-1.5 border-t border-slate-850", children: [_jsx("span", { className: "text-slate-500 font-bold uppercase tracking-wider", children: "Total Liability:" }), _jsxs("span", { className: "text-orange-400 font-black text-sm", children: ["\u20B9", checkData.stage_amount.toLocaleString()] })] })] }), _jsx("form", { onSubmit: handleSubmit, className: "space-y-4", "aria-label": `Payment form for ${checkData.stage_name}`, children: _jsxs("div", { className: "flex flex-col gap-2 pt-2", children: [_jsxs("button", { type: "button", onClick: payFromWalletFun, className: "w-full flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-950/80 border border-slate-850 hover:border-emerald-500/30 text-emerald-400 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all", "aria-label": `Pay ₹${checkData.stage_amount.toLocaleString()} for ${checkData.stage_name} from vault balance`, children: [_jsx(Wallet, { className: "w-3.5 h-3.5" }), " Deduct From Local Wallet"] }), _jsxs("button", { type: "submit", disabled: !stripe, className: "w-full flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 text-slate-950 hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors disabled:cursor-not-allowed", "aria-label": `Pay ₹${checkData.stage_amount.toLocaleString()} for ${checkData.stage_name} using Stripe gateway`, children: [_jsx(Landmark, { className: "w-3.5 h-3.5" }), " Route via Stripe Gateway"] })] }) })] })] }) }));
}
export default PaymentForm;
