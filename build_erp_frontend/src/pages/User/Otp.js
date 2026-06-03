import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { resendOTPApi, verifyOTPAPI } from '../../api/auth';
function Otp() {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(() => {
        const saved = localStorage.getItem("timer");
        return saved ? Number(saved) : 0;
    });
    const [resend, setResend] = useState(false);
    const [send, setSend] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const otpRef = useRef(null);
    const timerRef = useRef(null);
    const navigate = useNavigate();
    const otpEmail = localStorage.getItem('otpEmail');
    useEffect(() => {
        let start = Number(localStorage.getItem('timer')) || 0;
        const interval = setInterval(() => {
            if (start < 30) {
                start += 1;
                setTimer(start);
                localStorage.setItem('timer', String(start));
            }
            else {
                setResend(true);
                setSend(false);
                if (timerRef.current) {
                    timerRef.current.innerText = 'Time out. You can now resend OTP.';
                }
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [resend]);
    const verifyOTP = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (otp.trim() === '') {
            if (otpRef.current)
                otpRef.current.innerText = 'Please enter OTP.';
            hasError = true;
        }
        else if (!/^\d{6}$/.test(otp)) {
            if (otpRef.current)
                otpRef.current.innerText = 'OTP must be a 6-digit number.';
            hasError = true;
        }
        else {
            if (otpRef.current)
                otpRef.current.innerText = '';
        }
        if (hasError || !otpEmail) {
            if (!otpEmail && otpRef.current) {
                otpRef.current.innerText = 'No email found. Please sign up again.';
            }
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await verifyOTPAPI({ otp, email: otpEmail });
            if (response.success) {
                toast.success(response.message);
                localStorage.removeItem('otpEmail');
                localStorage.removeItem('timer');
                setTimeout(() => navigate('/login'), 1500);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error('An error occurred during verification.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const resendOTP = async () => {
        if (!otpEmail) {
            toast.error('No email found. Please sign up again.');
            return;
        }
        const response = await resendOTPApi(otpEmail);
        if (response.success) {
            toast.success(response.message);
            setTimer(0);
            localStorage.setItem('timer', '0');
            setResend(false);
            setSend(true);
            if (timerRef.current)
                timerRef.current.innerText = '';
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8", children: [_jsx("div", { className: "absolute inset-0 opacity-5 pointer-events-none", children: _jsx("div", { className: "absolute inset-0", style: {
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
                        } }) }), _jsx("div", { className: "absolute top-1/4 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse" }), _jsx("div", { className: "absolute bottom-1/4 right-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse", style: { animationDelay: '1s' } }), _jsxs("div", { className: "relative max-w-md w-full mx-auto z-10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl mb-4", children: _jsx(ShieldCheck, { className: "w-10 h-10 text-white" }) }), _jsx("h2", { className: "text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 tracking-tight", children: "Account Verification" }), _jsx("div", { className: "w-16 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto rounded-full" }), otpEmail && (_jsxs("p", { className: "mt-3 text-sm text-gray-300 max-w-xs mx-auto font-medium", children: ["Verify your entry request using the code sent to ", _jsx("span", { className: "text-orange-400 font-semibold", children: otpEmail })] }))] }), _jsx("div", { className: "bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-orange-500/20", children: _jsxs("form", { onSubmit: verifyOTP, className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "otp", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["6-Digit Verification Code ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("div", { className: "relative", children: _jsx("input", { type: "text", id: "otp", maxLength: 6, placeholder: "000000", value: otp, onChange: (e) => setOtp(e.target.value.replace(/\D/g, '')), className: "tracking-[0.2em] font-mono text-xl text-center w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 hover:border-orange-300", "aria-label": "6-digit OTP" }) }), _jsx("p", { ref: otpRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsxs("div", { className: "text-center text-sm font-medium text-gray-600", children: [timer < 30 ? (_jsxs("div", { className: "flex items-center justify-center gap-2 text-slate-700 bg-slate-100 py-2 px-3 rounded-xl border border-slate-200", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500" }), _jsxs("span", { children: ["Resend active in: ", _jsxs("strong", { className: "text-orange-600 font-bold", children: [30 - timer, "s"] })] })] })) : null, _jsx("p", { ref: timerRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium" })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("button", { type: "submit", disabled: timer >= 30 || isSubmitting, className: "w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center space-x-2", "aria-label": "Verify OTP", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }), _jsx("span", { children: "Validating Security Key..." })] })) : (_jsx("span", { children: "Verify Code" })) }), _jsxs("button", { type: "button", disabled: !resend, onClick: resendOTP, className: "w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 disabled:from-gray-200 disabled:to-gray-300 text-white disabled:text-gray-400 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-md disabled:shadow-none flex items-center justify-center gap-2 border border-transparent disabled:border-gray-200", "aria-label": "Resend OTP", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), "Request New Code"] })] })] }) })] })] }) }));
}
export default Otp;
