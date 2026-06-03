import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { markReadApi } from "../../../api/notification";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { ArrowRight } from "lucide-react";
function Notification({ isNotificationOpen, setIsNotificationOpen, notification, displayNotification }) {
    if (!isNotificationOpen) {
        return null;
    }
    const [view, setView] = useState("unread");
    const [loading, setLoading] = useState(false);
    const markReadFun = async (Id) => {
        setLoading(true);
        const response = await markReadApi(Id);
        setLoading(false);
        if (response.success) {
            displayNotification();
        }
        else {
            toast.error(response.message);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center p-4 z-50", children: _jsxs("div", { className: "relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-slate-700", children: [_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Notifications" }), _jsx("button", { onClick: () => !loading && setIsNotificationOpen(false), className: "text-slate-400 hover:text-white transition-colors", disabled: loading, "aria-label": "Close notifications", children: "\u2715" })] }), _jsxs("div", { className: "flex space-x-4 mb-6", children: [_jsx("button", { onClick: () => setView("unread"), className: `px-4 py-2 rounded-md font-medium text-sm transition-colors ${view === "unread"
                                        ? "bg-orange-500 text-white"
                                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`, disabled: loading, children: "Unread" }), _jsx("button", { onClick: () => setView("all"), className: `px-4 py-2 rounded-md font-medium text-sm transition-colors ${view === "all"
                                        ? "bg-orange-500 text-white"
                                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`, disabled: loading, children: "All" })] }), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "w-full text-left border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-700", children: [_jsx("th", { className: "py-3 px-4 text-sm font-medium text-slate-300", children: "SL No" }), _jsx("th", { className: "py-3 px-4 text-sm font-medium text-slate-300", children: "Date" }), _jsx("th", { className: "py-3 px-4 text-sm font-medium text-slate-300", children: "Description" }), _jsx("th", { className: "py-3 px-4 text-sm font-medium text-slate-300", children: "Action" })] }) }), _jsx("tbody", { children: (view === "unread"
                                                ? notification.filter((element) => !element.read)
                                                : notification).map((item, index) => (_jsxs("tr", { className: `border-b border-slate-700 hover:bg-slate-600 ${item.read ? "opacity-75" : ""}`, children: [_jsx("td", { className: "py-3 px-4 text-sm text-slate-300", children: index + 1 }), _jsx("td", { className: "py-3 px-4 text-sm text-slate-300", children: new Date(item.date).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4 text-sm text-slate-300", children: item.description }), _jsx("td", { className: "py-3 px-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [!item.read && (_jsx("button", { onClick: () => !loading && markReadFun(item._id), className: "text-orange-500 hover:text-orange-600 text-xl font-medium transition-colors duration-200", title: "Mark as Read", disabled: loading, children: "\u2713" })), item.read && (_jsx("span", { className: "text-green-400 font-medium", children: "Read" })), _jsx(Link, { to: item.url, onClick: () => !loading && setIsNotificationOpen(false), "aria-label": `Go to page for notification ${index + 1}`, className: "text-slate-300 hover:text-orange-500 transition-colors duration-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500", children: _jsx(ArrowRight, { className: "h-5 w-5" }) })] }) })] }, item._id))) })] }), (view === "unread"
                                    ? notification.filter((element) => !element.read).length === 0
                                    : notification.length === 0) && (_jsx("p", { className: "text-center text-slate-400 py-4", children: view === "unread" ? "No unread notifications" : "No notifications available" }))] })] }), loading && (_jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg pointer-events-none", children: _jsx(Loading, {}) }))] }) }));
}
export default Notification;
