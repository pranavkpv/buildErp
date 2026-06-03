import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Loading from "../../../components/Loading";
import { postSitemanager } from "../../../api/Admin/sitemanager";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
function AddSitemanager({ addEnable, setAddEnable, onAddSuccess }) {
    const [sitemanager, setSitemanager] = useState("");
    const [email, setEmail] = useState("");
    const sitemanagerRef = useRef(null);
    const emailRef = useRef(null);
    const [loadOn, setLoadOn] = useState(false);
    const sitemanagerAdd = async (e) => {
        e.preventDefault();
        let hasError = false;
        if (sitemanager.trim() === "") {
            if (sitemanagerRef.current)
                sitemanagerRef.current.innerText = "Sitemanager is required";
            hasError = true;
        }
        else {
            if (sitemanagerRef.current)
                sitemanagerRef.current.innerText = "";
        }
        if (email.trim() === "") {
            if (emailRef.current)
                emailRef.current.innerText = "Email is required";
            hasError = true;
        }
        else {
            if (emailRef.current)
                emailRef.current.innerText = "";
        }
        if (hasError)
            return;
        try {
            setLoadOn(true);
            const username = sitemanager;
            const data = await postSitemanager(username, email);
            if (data.success) {
                setLoadOn(false);
                toast.success(data.message);
                setAddEnable(false);
                onAddSuccess();
            }
            else {
                setLoadOn(false);
                toast.error(data.message);
            }
        }
        catch (error) {
            setLoadOn(false);
        }
    };
    if (!addEnable)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-700/50", children: [_jsx("h2", { className: "text-xl font-semibold text-center text-gray-100 mb-6", children: "Add Site Manager" }), _jsxs("form", { onSubmit: sitemanagerAdd, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-200 mb-1.5", children: "Name" }), _jsx("input", { type: "text", placeholder: "Enter site manager name", onChange: (e) => setSitemanager(e.target.value), className: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium" }), _jsx("p", { ref: sitemanagerRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-200 mb-1.5", children: "Email" }), _jsx("input", { type: "text", placeholder: "Enter site manager email", onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm font-medium" }), _jsx("p", { ref: emailRef, className: "text-sm text-red-400 mt-1.5" })] }), _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx("button", { type: "button", onClick: () => setAddEnable(false), className: "bg-gray-600/90 hover:bg-gray-700 text-gray-100 px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-teal-500/90 hover:bg-teal-600 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium", children: "Save" })] })] })] }) }), loadOn && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl pointer-events-none z-50", children: _jsx(Loading, {}) }))] }));
}
export default AddSitemanager;
