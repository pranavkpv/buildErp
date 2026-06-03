import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/authslice';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { SignInWithGoogle, userLoginAPI } from '../../api/auth';
function Login() {
    const [email, setEmail] = useState('');
    const emailRef = useRef(null);
    const [password, setPassword] = useState('');
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [hide, setHide] = useState(false);
    const dispatch = useDispatch();
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (email.trim() === '') {
            if (emailRef.current) {
                emailRef.current.innerText = 'Email is required. Please enter your email address.';
            }
            hasError = true;
        }
        else {
            if (emailRef.current) {
                emailRef.current.innerText = '';
            }
        }
        if (password.trim() === '') {
            if (passwordRef.current) {
                passwordRef.current.innerText = 'Password is required. Please enter your password.';
            }
            hasError = true;
        }
        else {
            if (passwordRef.current) {
                passwordRef.current.innerText = '';
            }
        }
        if (hasError) {
            return;
        }
        const response = await userLoginAPI({ email, password });
        if (response.success) {
            toast.success(response.message);
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
            dispatch(login({
                _id: response.data.userData._id,
                username: response.data.userData.username,
                email: response.data.userData.email,
                phone: response.data.userData.phone,
                profile_image: response.data?.userData.profile_image,
                token: response.data.tokens.accessToken,
            }));
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        else {
            toast.error(response.message);
        }
    };
    const loginWithGoogle = async (credentialResponse) => {
        if (credentialResponse.credential) {
            const user = jwtDecode(credentialResponse.credential);
            const response = await SignInWithGoogle({
                email: user.email,
                username: user.given_name + user.family_name,
                profile_image: user.picture,
            });
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem('accessToken', response.data.tokens.accessToken);
                dispatch(login({
                    _id: response.data.userData._id,
                    username: response.data.userData.username,
                    email: response.data.userData.email,
                    phone: response.data.userData.phone,
                    profile_image: response.data?.userData.profile_image,
                    token: response.data.tokens.accessToken,
                }));
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            else {
                toast.error(response.message);
            }
        }
        else {
            console.error("No credential found");
        }
    };
    const handleError = () => {
        console.error("Google login failed");
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-5", children: _jsx("div", { className: "absolute inset-0", style: {
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)`
                    } }) }), _jsx("div", { className: "absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full filter blur-3xl opacity-10 animate-pulse" }), _jsx("div", { className: "absolute bottom-10 right-10 w-40 h-40 bg-yellow-500 rounded-full filter blur-3xl opacity-10 animate-pulse", style: { animationDelay: '1s' } }), _jsxs("form", { onSubmit: handleLoginSubmit, className: "relative bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-orange-500/20 space-y-6 z-10", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 rounded-t-2xl" }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg mb-2", children: _jsx("svg", { className: "w-10 h-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }), _jsx("h1", { className: "text-3xl font-extrabold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent", children: "Construction ERP" }), _jsx("p", { className: "text-sm text-gray-600 font-medium", children: "Sign in to your dashboard" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-bold text-gray-700 uppercase tracking-wide", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-orange-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" }) }) }), _jsx("input", { type: "email", id: "email", placeholder: "name@company.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", "aria-label": "Email address" })] }), _jsxs("p", { ref: emailRef, className: "text-red-600 text-xs font-semibold min-h-[1rem] flex items-center gap-1", children: [_jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }), emailRef.current?.innerText] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-bold text-gray-700 uppercase tracking-wide", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-orange-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), _jsx("input", { type: hide ? "text" : "password", id: "password", placeholder: "Enter your password", onChange: (e) => setPassword(e.target.value), value: password, className: "w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-900 placeholder-gray-400 font-medium hover:border-orange-300", "aria-label": "Password" }), _jsx("button", { type: "button", onClick: () => setHide(!hide), className: "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-orange-100 transition-colors duration-200 text-gray-500 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500", "aria-label": hide ? "Hide password" : "Show password", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5", children: hide ? (_jsxs(_Fragment, { children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" })] })) : (_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223" })) }) })] }), _jsxs("p", { ref: passwordRef, className: "text-red-600 text-xs font-semibold min-h-[1rem] flex items-center gap-1", children: [_jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }), passwordRef.current?.innerText] })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(Link, { to: "/otpsend", className: "text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 flex items-center gap-1 group", "aria-label": "Forgot your password?", children: ["Forgot Password?", _jsx("svg", { className: "w-4 h-4 transform group-hover:translate-x-1 transition-transform", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }) }), _jsxs("button", { type: "submit", className: "w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:-translate-y-0.5 flex items-center justify-center gap-2", "aria-label": "Login", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" }) }), "Sign In to Dashboard"] }), _jsxs("div", { className: "flex items-center justify-center gap-3 my-4", children: [_jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" }), _jsx("span", { className: "text-xs font-bold text-gray-500 uppercase tracking-wider", children: "or" }), _jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" })] }), _jsx("div", { className: "flex justify-center", children: _jsx(GoogleLogin, { onSuccess: loginWithGoogle, onError: handleError, text: "signin_with", shape: "rectangular", size: "medium", width: "100%" }) }), _jsxs("div", { className: "text-center space-y-1", children: [_jsxs("p", { className: "text-sm text-gray-600 font-medium", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "text-orange-600 hover:text-orange-700 font-bold transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-orange-700", "aria-label": "Sign up for Construction ERP", children: "Create Account" })] }), _jsx("p", { className: "text-xs text-gray-500", children: "Access your construction project management tools" })] }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 rounded-b-2xl" })] })] }));
}
export default Login;
