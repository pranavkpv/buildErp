import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { updatePasswordAPI } from "../../api/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { KeyRound, Eye, EyeOff } from 'lucide-react';
function NewPassword() {
    const otpEmail = localStorage.getItem('otpEmail');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hide, setHide] = useState(false);
    const [chide, setChide] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const passRef = useRef(null);
    const cpassRef = useRef(null);
    const navigate = useNavigate();
    const changePassword = async (e) => {
        e.preventDefault();
        let hasError = false;
        const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^])[a-zA-Z\d!@#$%^&*]{8,}$/;
        if (!passCheck.test(password)) {
            if (passRef.current) {
                passRef.current.innerText = 'Password must include uppercase, lowercase, number, special character, and be 8+ characters long.';
            }
            hasError = true;
        }
        else {
            if (passRef.current) {
                passRef.current.innerText = '';
            }
        }
        if (password !== confirmPassword) {
            if (cpassRef.current) {
                cpassRef.current.innerText = 'Passwords do not match.';
            }
            hasError = true;
        }
        else {
            if (cpassRef.current) {
                cpassRef.current.innerText = '';
            }
        }
        if (!otpEmail) {
            toast.error("User does not exist");
            return;
        }
        if (hasError) {
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await updatePasswordAPI({ email: otpEmail, password });
            if (response.success) {
                toast.success(response.message);
                localStorage.removeItem("otpEmail");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error("An error occurred while updating your password.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8", children: [_jsx("div", { className: "absolute inset-0 opacity-5 pointer-events-none", children: _jsx("div", { className: "absolute inset-0", style: {
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
                        } }) }), _jsx("div", { className: "absolute top-1/4 left-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse" }), _jsx("div", { className: "absolute bottom-1/4 right-10 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse", style: { animationDelay: '1s' } }), _jsxs("div", { className: "relative max-w-md w-full mx-auto z-10", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl shadow-2xl mb-4", children: _jsx(KeyRound, { className: "w-10 h-10 text-white" }) }), _jsx("h2", { className: "text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent mb-2 tracking-tight", children: "Reset Password" }), _jsx("div", { className: "w-16 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 mx-auto rounded-full" }), _jsx("p", { className: "mt-3 text-sm text-gray-300 max-w-xs mx-auto font-medium", children: "Please choose a strong credentials configuration to protect your access layout." })] }), _jsx("div", { className: "bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-orange-500/20", children: _jsxs("form", { onSubmit: changePassword, className: "space-y-5", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "password", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["New Password ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: hide ? "text" : "password", id: "password", placeholder: "Enter your new password", onChange: (e) => setPassword(e.target.value), value: password, className: "w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", "aria-label": "New password" }), _jsx("button", { type: "button", onClick: () => setHide(!hide), className: "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500", "aria-label": hide ? "Hide password" : "Show password", children: hide ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), _jsx("p", { ref: passRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium leading-relaxed" })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "confirmpassword", className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: ["Confirm Password ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: chide ? "text" : "password", id: "confirmpassword", placeholder: "Confirm your new password", onChange: (e) => setConfirmPassword(e.target.value), value: confirmPassword, className: "w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-gray-50 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", "aria-label": "Confirm new password" }), _jsx("button", { type: "button", onClick: () => setChide(!chide), className: "absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500", "aria-label": chide ? "Hide confirm password" : "Show confirm password", children: chide ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), _jsx("p", { ref: cpassRef, className: "text-sm text-red-500 mt-1 min-h-[1.5rem] font-medium leading-relaxed" })] }), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none shadow-lg disabled:shadow-none flex items-center justify-center space-x-2", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" }), _jsx("span", { children: "Updating Database..." })] })) : (_jsx("span", { children: "Update Credentials" })) }) })] }) })] })] }) }));
}
export default NewPassword;
