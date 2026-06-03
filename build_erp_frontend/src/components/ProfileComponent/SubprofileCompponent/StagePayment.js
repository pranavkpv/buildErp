import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getStageInUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import { CreditCard, X, CalendarRange, Coins } from "lucide-react";
// Fixed Stripe Handshake Bug: Initialize outside the component execution loop to prevent re-instantiation memory drops
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
function StagePayment({ stagePayOn, setStagePayOn, projectId }) {
    if (!stagePayOn)
        return null;
    const [stage, setStage] = useState([]);
    const [checkOn, setCheckOn] = useState(false);
    const [checkData, setCheckData] = useState();
    const fetchStage = async (targetProjectId) => {
        try {
            const response = await getStageInUser(targetProjectId);
            if (response.success) {
                setStage(response.data);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to fetch process ledger states");
        }
    };
    useEffect(() => {
        fetchStage(projectId);
    }, [projectId]);
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
        catch {
            return "BAD_DATETIME";
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 selection:bg-orange-500 selection:text-white animate-in fade-in duration-150", children: [_jsxs("div", { className: "relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 z-20" }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-850", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(Coins, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Stage Allocation Balance Ledger" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Milestone Escrow Clearing Account Profile" })] })] }), _jsx("button", { onClick: () => setStagePayOn(false), className: "p-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-500 hover:text-slate-300 rounded-xl transition-colors", "aria-label": "Dismiss ledger terminal", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "max-h-[55vh] overflow-y-auto overflow-x-auto rounded-xl border border-slate-850 bg-slate-950/40 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950", role: "region", "aria-label": "Escrow processing balance data directory", children: _jsxs("table", { className: "min-w-full border-collapse", children: [_jsx("thead", { className: "bg-slate-950 sticky top-0 z-10 border-b border-slate-850", children: _jsx("tr", { children: ["INDEX", "STAGE_NOMENCLATURE", "START_DATE", "DEADLINE_DATE", "BALANCE_DUE", "TRANSACTION_NODE"].map((header) => (_jsx("th", { scope: "col", className: "px-5 py-3 text-left text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest", children: header }, header))) }) }), _jsx("tbody", { className: "divide-y divide-slate-850 bg-slate-900/10", children: stage.length > 0 ? (stage.map((element, index) => {
                                                // Operational business validation logic constraints mapping
                                                const isPassedThreshold = new Date(element.end_date) <= new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
                                                const isDisabled = !(isPassedThreshold && element.paymentStatus === "pending");
                                                let buttonStyles = "border-slate-800 bg-slate-950 text-slate-500 cursor-not-allowed";
                                                let labelText = "LOCKED";
                                                if (element.paymentStatus === "completed") {
                                                    buttonStyles = "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-black cursor-default";
                                                    labelText = "PAID";
                                                }
                                                else if (element.paymentStatus === "verified") {
                                                    buttonStyles = "border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-black cursor-default";
                                                    labelText = "VERIFIED";
                                                }
                                                else if (!isDisabled) {
                                                    buttonStyles = "border-orange-500/40 hover:border-orange-500 bg-orange-500/10 text-orange-400 hover:bg-orange-500 hover:text-slate-950 font-black active:scale-[0.98]";
                                                    labelText = "PROCESS PAY";
                                                }
                                                return (_jsxs("tr", { className: "hover:bg-slate-950/30 group transition-colors", children: [_jsx("td", { className: "px-5 py-4 whitespace-nowrap font-mono text-xs text-slate-600 font-bold", children: (index + 1).toString().padStart(2, '0') }), _jsx("td", { className: "px-5 py-4 whitespace-nowrap text-xs font-mono font-black text-slate-200 uppercase group-hover:text-orange-400 transition-colors", children: element.stage_name }), _jsx("td", { className: "px-5 py-4 whitespace-nowrap text-xs font-mono text-slate-400", children: formatDate(element.start_date) }), _jsx("td", { className: "px-5 py-4 whitespace-nowrap text-xs font-mono text-slate-400", children: formatDate(element.end_date) }), _jsxs("td", { className: "px-5 py-4 whitespace-nowrap text-xs font-mono font-black text-amber-500", children: ["\u20B9", element.stage_amount.toLocaleString("en-IN"), ".00"] }), _jsx("td", { className: "px-5 py-4 whitespace-nowrap", children: _jsx("button", { type: "button", onClick: () => {
                                                                    if (!isDisabled) {
                                                                        setCheckData(element);
                                                                        setCheckOn(true);
                                                                    }
                                                                }, disabled: isDisabled && element.paymentStatus === "pending", className: `px-3 py-1.5 border rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all focus:outline-none ${buttonStyles}`, children: labelText }) })] }, element._id));
                                            })) : (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-6 py-16 text-center border border-dashed border-slate-850 bg-slate-950/20 rounded-b-xl", children: _jsx("p", { className: "font-mono text-xs font-bold text-slate-600 uppercase tracking-widest", children: "CRITICAL: No localized pipeline logs found." }) }) })) })] }) }), _jsx("div", { className: "flex justify-end gap-2 mt-6 pt-4 border-t border-slate-850", children: _jsx("button", { type: "button", onClick: () => setStagePayOn(false), className: "px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors", children: "Exit Ledger" }) })] })] }), checkOn && checkData && (_jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 selection:bg-orange-500 selection:text-white animate-in zoom-in-95 duration-150", children: _jsxs("div", { className: "relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" }), _jsx("button", { type: "button", onClick: () => setCheckOn(false), className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", "aria-label": "Abort purchase flow", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-850", children: [_jsx("div", { className: "p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0", children: _jsx(CreditCard, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-white uppercase tracking-wider", children: "Secure Vault Settlement" }), _jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: [_jsx(CalendarRange, { className: "w-3 h-3 text-slate-600" }), " TARGET: ", checkData.stage_name] })] })] }), _jsx(Elements, { stripe: stripePromise, children: _jsx(PaymentForm, { checkData: checkData, checkOn: checkOn, setCheckOn: setCheckOn }) })] })] }) }))] }));
}
export default StagePayment;
