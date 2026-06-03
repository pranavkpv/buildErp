import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/slice/authslice";
import { resendForUpadteEmailApi, verifyEditEmailOTP } from "../../../api/userprofile";
import { KeyRound, X, RefreshCw } from "lucide-react";
function EditVarifyOTPModal({ setOtpEnable, OtpEnable }) {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);
    const [resend, setResend] = useState(false);
    const otpRef = useRef(null);
    const resendOTP = async () => {
        try {
            const response = await resendForUpadteEmailApi();
            if (response.success) {
                toast.success(response.message);
                setTimer(0);
                setResend(false);
                localStorage.setItem("timer", "0");
                if (otpRef.current)
                    otpRef.current.innerText = "";
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("Failed to resend OTP");
            console.error("Error resending OTP:", error);
        }
    };
    const verifyOTP = async (e) => {
        e.preventDefault();
        if (!otp.match(/^\d{6}$/)) {
            if (otpRef.current) {
                otpRef.current.innerText = "CRITICAL: Input signature must be a 6-digit numeric string.";
            }
            return;
        }
        try {
            const response = await verifyEditEmailOTP(otp);
            if (response.success) {
                toast.success(response.message);
                dispatch(login({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    phone: response.data.phone,
                    profile_image: response.data?.profile_image,
                    token: localStorage.getItem("accessToken") || "",
                }));
                setOtpEnable(false);
                setTimer(0);
                localStorage.removeItem("timer");
            }
            else {
                toast.error(response.message);
                if (otpRef.current) {
                    otpRef.current.innerText = `REJECTED: ${response.message}`;
                }
            }
        }
        catch (error) {
            toast.error("Failed to verify OTP");
            console.error("Error verifying OTP:", error);
        }
    };
    useEffect(() => {
        if (!OtpEnable)
            return;
        const savedTimer = Number(localStorage.getItem("timer")) || 0;
        setTimer(savedTimer);
        const interval = setInterval(() => {
            setTimer((prev) => {
                const newTimer = prev + 1;
                if (newTimer >= 30) {
                    setResend(true);
                    localStorage.setItem("timer", "30");
                    clearInterval(interval);
                    return 30;
                }
                localStorage.setItem("timer", String(newTimer));
                return newTimer;
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [OtpEnable]);
    if (!OtpEnable)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "relative max-w-sm w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600" }), _jsx("button", { onClick: () => setOtpEnable(false), "aria-label": "Close OTP verification modal", className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-slate-800", children: [_jsx("div", { className: "p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 shrink-0", children: _jsx(KeyRound, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-black text-white uppercase tracking-wider", children: "Security Checkpoint" }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mt-0.5", children: "OTP Secure Authentication" })] })] }), _jsxs("form", { onSubmit: verifyOTP, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "otp", className: "block text-xs font-mono font-black text-slate-400 uppercase tracking-wider mb-2", children: "Authentication Token" }), _jsx("input", { type: "text", id: "otp", maxLength: 6, placeholder: "000000", value: otp, onChange: (e) => {
                                                setOtp(e.target.value.replace(/[^0-9]/g, ""));
                                                if (otpRef.current)
                                                    otpRef.current.innerText = "";
                                            }, className: "w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-200 text-center text-lg font-mono font-black tracking-[0.5em] placeholder:text-slate-800 placeholder:tracking-normal transition-colors" }), _jsx("p", { ref: otpRef, className: "text-red-400 text-[10px] font-mono font-bold mt-2 uppercase tracking-wide min-h-[14px]" })] }), _jsx("div", { className: "bg-slate-950 border border-slate-850/60 rounded-xl p-3 text-center text-[11px] font-mono font-bold uppercase tracking-wider", children: timer < 30 ? (_jsxs("span", { className: "text-slate-400", children: ["Window Expires In: ", _jsxs("span", { className: "text-orange-400", children: [30 - timer, "s"] })] })) : (_jsx("span", { className: "text-amber-500", children: "Token frame expired. Request reissue." })) }), _jsxs("div", { className: "flex flex-col gap-2 pt-2", children: [_jsx("button", { type: "submit", disabled: timer >= 30, className: "w-full px-4 py-3 bg-orange-500 text-slate-950 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-colors disabled:cursor-not-allowed", children: "Verify Signature" }), _jsxs("button", { type: "button", disabled: !resend, onClick: resendOTP, className: "w-full px-4 py-3 bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-200 disabled:text-slate-700 disabled:border-transparent disabled:bg-transparent rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all disabled:cursor-not-allowed flex items-center justify-center gap-1.5", children: [_jsx(RefreshCw, { className: `w-3.5 h-3.5 ${!resend ? '' : 'animate-spin-slow'}` }), " Resend Token"] })] })] })] })] }) }));
}
export default EditVarifyOTPModal;
