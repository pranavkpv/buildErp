import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../api/socket";
import { fetchMessagesApi } from "../../api/userprofile";
import { toast } from "react-toastify";
import { Check, CheckCheck, Send, Terminal } from "lucide-react";
function ChatRoom({ sitemanagerName, sitemanagerId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((state) => state.auth.user);
    const scrollRef = useRef(null);
    // Auto-scroll anchor point deployment
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
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
        if (!sitemanagerId)
            return;
        try {
            const response = await fetchMessagesApi(sitemanagerId);
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
            toast.error("Failed to fetch terminal transmissions");
        }
    };
    const handleReceiveMessage = useCallback((message) => {
        const formatted = {
            id: message._id,
            message: message.message,
            senderId: message.senderId,
            receiverId: message.receiverId,
            messageStatus: message.messageStatus,
            time: convertTime(message.createdAt),
            date: convertDate(message.createdAt),
        };
        setMessages((prev) => {
            const exists = prev.find((m) => m.id === formatted.id);
            if (exists) {
                return prev.map((m) => m.id === formatted.id ? { ...m, messageStatus: formatted.messageStatus } : m);
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
        if (formatted.receiverId === user?._id &&
            formatted.messageStatus === "send") {
            socket.emit("messageDelivered", {
                messageId: formatted.id,
                senderId: formatted.senderId,
                receiverId: formatted.receiverId,
            });
        }
    }, [user?._id]);
    useEffect(() => {
        if (!user?._id || !sitemanagerId)
            return;
        messageFetch();
        socket.emit("joinRoom", { senderId: user._id, receiverId: sitemanagerId });
        socket.on("receiveMessage", handleReceiveMessage);
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [user?._id, sitemanagerId, handleReceiveMessage]);
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim())
            return toast.error("Message data payload empty");
        if (!user?._id || !sitemanagerId)
            return toast.error("Operation aborted: Missing verification tokens");
        const tempId = Date.now().toString();
        const tempMsg = {
            id: tempId,
            message: newMessage,
            senderId: user._id,
            receiverId: sitemanagerId,
            messageStatus: "sending",
            time: convertTime(new Date()),
            date: convertDate(new Date()),
            temp: true,
        };
        setMessages((prev) => [...prev, tempMsg]);
        socket.emit("sendMessage", {
            senderId: user._id,
            receiverId: sitemanagerId,
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
        return `${hours}:${minutes} ${ampm}`;
    };
    const convertDate = (dateInput) => {
        const date = new Date(dateInput);
        return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
    };
    const renderStatus = (status) => {
        switch (status) {
            case "sending":
                return _jsx("span", { className: "text-[10px] text-orange-400/50 animate-pulse font-mono font-bold uppercase", children: "Sending..." });
            case "send":
                return _jsx(Check, { className: "w-3.5 h-3.5 text-slate-500" });
            case "delivered":
                return _jsx(CheckCheck, { className: "w-3.5 h-3.5 text-slate-400" });
            case "seen":
                return _jsx(CheckCheck, { className: "w-3.5 h-3.5 text-orange-400" });
            default:
                return null;
        }
    };
    const grouped = groupMessages(messages);
    return (_jsxs("div", { className: "flex-1 flex flex-col h-full bg-slate-900 overflow-hidden", children: [_jsx("div", { className: "p-4 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg", children: _jsx(Terminal, { className: "w-4 h-4" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-sm font-black text-white uppercase tracking-wider", children: ["Link: ", sitemanagerName] }), _jsxs("p", { className: "text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5", children: [_jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" }), "Secure Stream Active"] })] })] }) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/20 custom-scrollbar", children: [grouped.map((group) => (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-center my-2", children: _jsx("span", { className: "px-3 py-1 text-[10px] font-mono font-bold bg-slate-950 border border-slate-800 text-slate-400 rounded-md uppercase tracking-wider shadow-sm", children: group.date === convertDate(new Date()) ? "Today" : group.date }) }), group.messages.map((msg) => {
                                const isMe = msg.senderId === user?._id;
                                return (_jsx("div", { className: `flex ${isMe ? "justify-end" : "justify-start"}`, children: _jsxs("div", { className: `max-w-xs md:max-w-md px-4 py-3 rounded-2xl relative border ${isMe
                                            ? "bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-950/20"
                                            : "bg-slate-950 border-slate-800 text-slate-200 rounded-tl-none shadow-md"}`, children: [_jsx("p", { className: "text-sm leading-relaxed break-words font-medium", children: msg.message }), _jsxs("div", { className: "flex items-center justify-end gap-1.5 mt-1.5 select-none opacity-85", children: [_jsx("span", { className: `text-[9px] font-mono font-bold uppercase ${isMe ? "text-orange-200/80" : "text-slate-500"}`, children: msg.time }), isMe && (_jsx("div", { className: "shrink-0 flex items-center", children: renderStatus(msg.messageStatus) }))] })] }) }, msg.id));
                            })] }, group.date))), _jsx("div", { ref: scrollRef })] }), _jsxs("form", { onSubmit: handleSendMessage, className: "p-3 bg-slate-950/50 border-t border-slate-800/80 flex gap-2", children: [_jsx("input", { type: "text", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Command payload entry box...", className: "flex-1 px-4 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium" }), _jsx("button", { type: "submit", disabled: !newMessage.trim(), className: "px-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-20 flex items-center justify-center border border-orange-500/20 shadow-md", "aria-label": "Transmit payload", children: _jsx(Send, { className: "w-4 h-4" }) })] })] }));
}
export default ChatRoom;
