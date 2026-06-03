import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertTriangle } from "lucide-react";
import { logout } from "../../../redux/slice/authslice";
import { userLogout } from "../../../api/userprofile";
function LogoutModal({ logoutEnable, setLogoutEnable }) {
    if (!logoutEnable)
        return null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutFun = async () => {
        const data = await userLogout();
        if (data.success) {
            localStorage.removeItem("accessToken");
            toast.success(data.message);
            dispatch(logout());
            setLogoutEnable(false);
            setTimeout(() => navigate('/login'), 1500);
        }
        else {
            toast.error(data.message || "Logout failed");
        }
    };
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 p-4", children: _jsxs("div", { className: "relative bg-slate-900 border-2 border-orange-500/30 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-auto overflow-hidden transform transition-all duration-300 scale-100", role: "dialog", "aria-modal": "true", "aria-labelledby": "logout-modal-title", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1.5", style: {
                        backgroundImage: `repeating-linear-gradient(45deg, #f97316, #f97316 10px, #1e293b 10px, #1e293b 20px)`
                    } }), _jsx("div", { className: "mx-auto flex items-center justify-center h-14 w-14 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-4 mt-2", children: _jsx(AlertTriangle, { className: "h-7 w-7 stroke-[2]" }) }), _jsx("h2", { id: "logout-modal-title", className: "text-xl font-black text-center text-white uppercase tracking-wider mb-2", children: "Termination Request" }), _jsx("p", { className: "text-slate-400 text-sm text-center font-medium mb-6", children: "Are you sure you want to end your current active session? Unsaved schematic progress might be lost." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx("button", { type: "button", onClick: () => setLogoutEnable(false), className: "w-full order-2 sm:order-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold rounded-xl transition-all duration-300 border border-slate-700 text-sm uppercase tracking-wider", "aria-label": "Cancel logout", children: "Cancel" }), _jsx("button", { type: "button", onClick: logoutFun, className: "w-full order-1 sm:order-2 px-4 py-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 text-white font-black rounded-xl transition-all duration-300 shadow-lg text-sm uppercase tracking-wider", "aria-label": "Confirm logout", children: "Disconnect" })] })] }) }));
}
export default LogoutModal;
