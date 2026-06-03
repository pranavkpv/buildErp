import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "react-toastify";
import { editEmailApi } from "../../../api/userprofile";
import { Mail, X } from "lucide-react";
function EditEmailModal({ emailEnable, setEmailEnable, setOtpEnable }) {
    const [email, setEmail] = useState("");
    if (!emailEnable)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        try {
            const response = await editEmailApi(email);
            if (response.success) {
                toast.success(response.message);
                setEmailEnable(false);
                setOtpEnable(true);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to request email update");
            console.error("Error requesting email update:", error);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsx("button", { onClick: () => setEmailEnable(false), "aria-label": "Close email update modal", className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(Mail, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Update Email Identity" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "Routing Node Dispatch Configuration" })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-xs font-mono font-black text-slate-400 uppercase tracking-wider mb-2", children: "Target Email Address" }), _jsx("input", { id: "email", type: "email", placeholder: "e.g., identity@domain.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-200 text-xs font-mono font-bold tracking-wide placeholder:text-slate-600 transition-colors", autoComplete: "email" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-2", children: [_jsx("button", { type: "button", onClick: () => setEmailEnable(false), className: "w-full sm:w-auto px-5 py-2.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors order-2 sm:order-1", children: "Abort Changes" }), _jsx("button", { type: "submit", className: "w-full sm:w-auto px-5 py-2.5 bg-orange-500 text-slate-950 hover:bg-orange-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors order-1 sm:order-2", children: "Request Verification" })] })] })] })] }) }));
}
export default EditEmailModal;
