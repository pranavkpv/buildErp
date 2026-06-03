import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { jwtDecode } from "jwt-decode";
import { socket } from "../../../api/socket";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchMessagesApiInSitemanager } from "../../../api/Sitemanager/profile";
function SiteChatRoom({ username, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const accessToken = localStorage.getItem("accessToken");
    const user = accessToken ? jwtDecode(accessToken) : null;
    const groupMessages = (msgs) => {
        return msgs.reduce((acc, msg) => {
            const group = acc.find((g) => g.date === msg.date);
            if (group) {
                group.messages.push(msg);
            }
            else {
                acc.push({ date: msg.date, messages: [msg] });
            }
            return acc;
        }, []);
    };
    const messageFetch = async () => {
        if (!userId)
            return;
        try {
            const response = await fetchMessagesApiInSitemanager(userId);
            if (response.success) {
                const x = response.data.map((element) => ({
                    id: element._id,
                    message: element.message,
                    senderId: element.senderId,
                    receiverId: element.receiverId,
                    messageStatus: element.messageStatus,
                    time: convertTime(element.createdAt),
                    date: convertDate(element.createdAt),
                }));
                setMessages(x);
            }
            else {
                toast.error(response.message);
            }
        }
        catch {
            toast.error("Failed to fetch messages");
        }
    };
    const handleReceiveMessage = useCallback((message) => {
        const formatted = {
            _id: message._id,
            message: message.message,
            senderId: message.senderId,
            receiverId: message.receiverId,
            messageStatus: message.messageStatus,
            time: convertTime(message.createdAt),
            date: convertDate(message.createdAt),
        };
        setMessages((prev) => {
            const exists = prev.find((m) => m._id === formatted._id);
            if (exists) {
                return prev.map((m) => m._id === formatted._id ? { ...m, messageStatus: formatted.messageStatus } : m);
            }
            const tempExists = prev.find((m) => m.temp &&
                m.message === formatted.message &&
                m.senderId === formatted.senderId &&
                m.receiverId === formatted.receiverId);
            if (tempExists) {
                return prev.map((m) => m.temp && m.message === formatted.message
                    ? { ...formatted, temp: false }
                    : m);
            }
            return [...prev, formatted];
        });
        if (!user)
            return;
        if (formatted.receiverId === user._id &&
            formatted.messageStatus === "send") {
            socket.emit("messageDelivered", {
                messageId: formatted._id,
                senderId: formatted.senderId,
                receiverId: formatted.receiverId,
            });
        }
    }, [user?._id]);
    useEffect(() => {
        if (!user?._id || !userId)
            return;
        messageFetch();
        socket.emit("joinRoom", { senderId: user._id, receiverId: userId });
        socket.on("receiveMessage", handleReceiveMessage);
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [user?._id, userId, handleReceiveMessage]);
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim())
            return toast.error("Message cannot be empty");
        if (!user?._id || !userId)
            return toast.error("Cannot send message: Invalid user");
        const tempId = Date.now().toString();
        const tempMsg = {
            _id: tempId,
            message: newMessage,
            senderId: user._id,
            receiverId: userId,
            messageStatus: "sending",
            time: convertTime(new Date()),
            date: convertDate(new Date()),
            temp: true,
        };
        setMessages((prev) => [...prev, tempMsg]);
        socket.emit("sendMessage", {
            senderId: user._id,
            receiverId: userId,
            message: newMessage,
        });
        setNewMessage("");
    };
    const convertTime = (dateInput) => {
        const date = new Date(dateInput);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes}${ampm}`;
    };
    const convertDate = (dateInput) => {
        const date = new Date(dateInput);
        return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
    };
    const renderStatus = (status) => {
        if (status === "send")
            return "✓";
        if (status === "delivered")
            return "✓✓";
        if (status === "seen")
            return "✓✓ (blue)";
        return "";
    };
    const grouped = groupMessages(messages);
    return (_jsxs("div", { className: "h-full flex flex-col bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-100 mb-6", children: ["Chat with ", username] }), _jsx("div", { className: "flex-1 overflow-y-auto bg-gray-800/50 rounded-lg p-4 space-y-6 mb-4", children: grouped.length === 0 ? (_jsx("div", { className: "text-center text-gray-400 text-sm", children: "No messages yet. Start the conversation!" })) : (grouped.map((group) => (_jsxs("div", { children: [_jsx("div", { className: "text-center mb-2", children: _jsx("span", { className: "px-3 py-1 text-xs bg-gray-600 rounded-full text-gray-200", children: group.date === convertDate(new Date()) ? "Today" : group.date }) }), group.messages.map((msg) => (_jsx("div", { className: `flex mb-2 ${msg.senderId === user?._id ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: `max-w-xs p-3 rounded-2xl shadow ${msg.senderId === user?._id
                                    ? "bg-teal-500 text-white rounded-br-none"
                                    : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"}`, children: [_jsx("p", { className: "break-words", children: msg.message }), _jsx("p", { className: "text-[10px] text-slate-700 mt-1 text-right", children: msg.time }), msg.senderId === user?._id && (_jsx("p", { className: "text-[10px] text-right mt-0.5", children: renderStatus(msg.messageStatus) }))] }) }, msg._id)))] }, group.date)))) }), _jsxs("form", { onSubmit: handleSendMessage, className: "flex items-center gap-2", children: [_jsx("label", { htmlFor: "messageInput", className: "sr-only", children: "Type your message" }), _jsx("input", { id: "messageInput", type: "text", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Type your message...", className: "flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm" }), _jsx("button", { type: "submit", className: "px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold", children: "Send" })] })] }));
}
export default SiteChatRoom;
