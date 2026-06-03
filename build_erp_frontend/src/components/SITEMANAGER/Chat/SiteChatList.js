import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { fetchProjectBySitemanager } from "../../../api/Sitemanager/profile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SiteChatRoom from "./SiteChatRoom";
function SiteChatList() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const fetchSitemanager = async () => {
        setLoading(true);
        const response = await fetchProjectBySitemanager();
        if (response.success) {
            setProjectData(response.data ?? []);
            setError(null);
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
    const handleChatClick = (username, userId) => {
        setSelectedName(username);
        setSelectedId(userId);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row gap-6", children: [_jsxs("aside", { className: "w-full sm:w-1/4 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-100 mb-6", children: "Chat List" }), loading && (_jsx("div", { className: "flex justify-center items-center py-4", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400" }) })), error && (_jsx("div", { className: "text-center py-4 text-red-400 text-sm", children: _jsx("p", { children: error }) })), !loading && !error && projectData.length === 0 && (_jsx("div", { className: "text-center py-4", children: _jsx("p", { className: "text-gray-400 text-sm", children: "No chats available" }) })), !loading && !error && projectData.length > 0 && (_jsx("ul", { className: "space-y-3", children: projectData.map((element) => (_jsx("li", { className: `flex items-center bg-gray-800/50 rounded-lg border border-gray-700/50 ${selectedName === element.username ? "bg-gray-700/50 border-teal-500" : ""}`, children: _jsxs("button", { type: "button", onClick: () => handleChatClick(element.username, element.user_id), "aria-label": `Open chat with ${element.username}`, className: "flex items-center w-full p-4 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 rounded-lg", children: [_jsx("img", { src: element.user_image, alt: `User avatar for ${element.username}`, className: "w-12 h-12 rounded-full object-cover mr-4 border border-gray-600" }), _jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "text-base font-semibold text-gray-100", children: element.username }), _jsx("p", { className: "text-sm text-gray-400", children: element.project_name })] })] }) }, element._id))) }))] }), _jsx("main", { className: "flex-1 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700/50", children: selectedName && selectedId ? (_jsx(SiteChatRoom, { username: selectedName, userId: selectedId })) : (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("p", { className: "text-base text-gray-400", children: "Select a chat from the sidebar to start messaging" }) })) })] }) }));
}
export default SiteChatList;
