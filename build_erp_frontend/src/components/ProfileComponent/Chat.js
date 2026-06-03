import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChatRoom from "./ChatRoom";
import { fetchSitemanagerApI } from "../../api/userprofile";
import { MessageSquareCode, Radio, User } from "lucide-react";
function ChatList() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const fetchSitemanager = async () => {
        setLoading(true);
        const response = await fetchSitemanagerApI();
        if (response.success) {
            setProjectData(response.data ?? []);
        }
        else {
            setError(response.message);
            toast.error(response.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchSitemanager();
    }, []);
    const handleChatClick = (sitemanagername, sitemanagerId) => {
        setSelectedName(sitemanagername);
        setSelectedId(sitemanagerId);
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-950 text-slate-100 py-12 selection:bg-orange-500 selection:text-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6", children: [_jsxs("aside", { className: "w-full md:w-1/3 lg:w-1/4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col h-[calc(100vh-6rem)] shadow-xl", children: [_jsxs("div", { className: "flex items-center gap-2.5 border-b border-slate-800 pb-4 mb-4", children: [_jsx(Radio, { className: "w-4 h-4 text-orange-500 animate-pulse" }), _jsx("h2", { className: "text-xs font-mono font-bold uppercase tracking-widest text-slate-400", children: "Active Comms Channels" })] }), loading && (_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center gap-3 py-4", children: [_jsx("div", { className: "animate-spin rounded-full h-7 w-7 border-2 border-slate-800 border-t-orange-500" }), _jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold", children: "Synchronizing..." })] })), error && (_jsx("div", { className: "flex-1 flex items-center justify-center text-center p-4 border border-rose-950 bg-rose-950/10 rounded-xl", children: _jsx("p", { className: "text-xs font-mono font-semibold text-rose-400 uppercase tracking-tight", children: error }) })), !loading && !error && projectData.length === 0 && (_jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center p-4", children: [_jsx(MessageSquareCode, { className: "w-8 h-8 text-slate-700 mb-2" }), _jsx("p", { className: "text-xs font-mono text-slate-500 uppercase tracking-wider", children: "No links configured" })] })), !loading && !error && projectData.length > 0 && (_jsx("div", { className: "flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar", children: _jsx("ul", { className: "space-y-2", children: projectData.map((element) => {
                                    const isSelected = selectedId === element.sitemanager_id;
                                    return (_jsxs("li", { className: `flex items-center p-3.5 border rounded-xl cursor-pointer transition-all duration-200 group relative overflow-hidden ${isSelected
                                            ? 'bg-slate-950 border-orange-500/50 shadow-inner'
                                            : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-950 hover:border-slate-700'}`, onClick: () => handleChatClick(element.sitemanager_name, element.sitemanager_id), children: [_jsx("div", { className: `absolute left-0 top-0 bottom-0 w-1 transition-all duration-200 ${isSelected ? 'bg-orange-500' : 'bg-transparent group-hover:bg-slate-700'}` }), _jsxs("div", { className: "relative shrink-0 mr-3.5", children: [element.sitemanager_image ? (_jsx("img", { src: element.sitemanager_image, alt: element.sitemanager_name, className: "w-11 h-11 rounded-lg object-cover filter brightness-90 border border-slate-800", loading: "lazy" })) : (_jsx("div", { className: "w-11 h-11 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500", children: _jsx(User, { className: "w-5 h-5" }) })), _jsx("span", { className: `absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${isSelected ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}` })] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: `text-sm font-bold tracking-tight uppercase truncate transition-colors ${isSelected ? 'text-orange-400' : 'text-slate-200 group-hover:text-white'}`, children: element.sitemanager_name }), _jsx("p", { className: "text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider truncate mt-0.5", children: element.project_name })] })] }, element._id));
                                }) }) }))] }), _jsxs("main", { className: "flex-1 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[calc(100vh-6rem)] shadow-xl relative overflow-hidden", children: [selectedName && selectedId ? (_jsx(ChatRoom, { sitemanagerName: selectedName, sitemanagerId: selectedId })) : (_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center p-8 z-10", children: [_jsx("div", { className: "p-4 bg-slate-950 border border-slate-800 text-slate-600 rounded-2xl mb-4", children: _jsx(MessageSquareCode, { className: "w-8 h-8 text-slate-500" }) }), _jsx("h3", { className: "text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-1", children: "Awaiting Channel Selection" }), _jsx("p", { className: "text-xs text-slate-500 max-w-xs leading-relaxed font-medium", children: "Select a terminal module from the communication manifest index matrix to deploy full link channels." })] })), _jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-10 pointer-events-none" })] })] }) }));
}
export default ChatList;
