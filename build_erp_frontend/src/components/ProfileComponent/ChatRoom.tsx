import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { socket } from "../../api/socket";
import { fetchMessagesApi } from "../../api/userprofile";
import { toast } from "react-toastify";
import { Check, CheckCheck, Send, Terminal } from "lucide-react";

interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  messageStatus: string;
  time: string;
  date: string;
  temp?: boolean; 
}

interface ReceiveMessage {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  messageStatus: string;
  createdAt: string | Date;
}

interface ChatRoomProps {
  sitemanagerName: string;
  sitemanagerId: string | null;
}

interface DisplayMessage {
  date: string;
  messages: Message[];
}

function ChatRoom({ sitemanagerName, sitemanagerId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll anchor point deployment
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupMessages = (msgs: Message[]): DisplayMessage[] => {
    return msgs.reduce((acc: DisplayMessage[], msg) => {
      const group = acc.find((g) => g.date === msg.date);
      if (group) {
        group.messages.push(msg);
      } else {
        acc.push({ date: msg.date, messages: [msg] });
      }
      return acc;
    }, []);
  };

  const messageFetch = async () => {
    if (!sitemanagerId) return;
    try {
      const response = await fetchMessagesApi(sitemanagerId);
      if (response.success) {
        const x: Message[] = response.data.map((element: ReceiveMessage) => ({
          id: element._id,
          message: element.message,
          senderId: element.senderId,
          receiverId: element.receiverId,
          messageStatus: element.messageStatus,
          time: convertTime(element.createdAt),
          date: convertDate(element.createdAt),
        }));
        setMessages(x);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed to fetch terminal transmissions");
    }
  };

  const handleReceiveMessage = useCallback(
    (message: ReceiveMessage) => {
      const formatted: Message = {
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
          return prev.map((m) =>
            m.id === formatted.id ? { ...m, messageStatus: formatted.messageStatus } : m
          );
        }
        const tempExists = prev.find(
          (m) =>
            m.temp &&
            m.message === formatted.message &&
            m.senderId === formatted.senderId &&
            m.receiverId === formatted.receiverId
        );
        if (tempExists) {
          return prev.map((m) =>
            m.temp && m.message === formatted.message
              ? { ...formatted, temp: false }
              : m
          );
        }
        return [...prev, formatted];
      });

      if (
        formatted.receiverId === user?._id &&
        formatted.messageStatus === "send"
      ) {
        socket.emit("messageDelivered", {
          messageId: formatted.id,
          senderId: formatted.senderId,
          receiverId: formatted.receiverId,
        });
      }
    },
    [user?._id]
  );

  useEffect(() => {
    if (!user?._id || !sitemanagerId) return;

    messageFetch();
    socket.emit("joinRoom", { senderId: user._id, receiverId: sitemanagerId });
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [user?._id, sitemanagerId, handleReceiveMessage]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return toast.error("Message data payload empty");
    if (!user?._id || !sitemanagerId)
      return toast.error("Operation aborted: Missing verification tokens");

    const tempId = Date.now().toString();

    const tempMsg: Message = {
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

  const convertTime = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const convertDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "sending":
        return <span className="text-[10px] text-orange-400/50 animate-pulse font-mono font-bold uppercase">Sending...</span>;
      case "send":
        return <Check className="w-3.5 h-3.5 text-slate-500" />;
      case "delivered":
        return <CheckCheck className="w-3.5 h-3.5 text-slate-400" />;
      case "seen":
        return <CheckCheck className="w-3.5 h-3.5 text-orange-400" />;
      default:
        return null;
    }
  };

  const grouped = groupMessages(messages);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden">
      
      {/* Header Panel */}
      <div className="p-4 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Link: {sitemanagerName}
            </h2>
            <p className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Secure Stream Active
            </p>
          </div>
        </div>
      </div>

      {/* Main Messaging Logs Display Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950/20 custom-scrollbar">
        {grouped.map((group) => (
          <div key={group.date} className="space-y-4">
            
            {/* Datestamp Badge */}
            <div className="flex items-center justify-center my-2">
              <span className="px-3 py-1 text-[10px] font-mono font-bold bg-slate-950 border border-slate-800 text-slate-400 rounded-md uppercase tracking-wider shadow-sm">
                {group.date === convertDate(new Date()) ? "Today" : group.date}
              </span>
            </div>

            {group.messages.map((msg) => {
              const isMe = msg.senderId === user?._id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl relative border ${
                      isMe
                        ? "bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-950/20"
                        : "bg-slate-950 border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words font-medium">{msg.message}</p>
                    
                    {/* Timestamp & Status Metadata */}
                    <div className="flex items-center justify-end gap-1.5 mt-1.5 select-none opacity-85">
                      <span className={`text-[9px] font-mono font-bold uppercase ${isMe ? "text-orange-200/80" : "text-slate-500"}`}>
                        {msg.time}
                      </span>
                      {isMe && (
                        <div className="shrink-0 flex items-center">
                          {renderStatus(msg.messageStatus)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        {/* Continuous reactive anchor */}
        <div ref={scrollRef} />
      </div>

      {/* Input Action Form Base console */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-slate-950/50 border-t border-slate-800/80 flex gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Command payload entry box..."
          className="flex-1 px-4 py-3 bg-slate-950 text-slate-200 border-2 border-slate-800 rounded-xl placeholder-slate-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="px-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-20 flex items-center justify-center border border-orange-500/20 shadow-md"
          aria-label="Transmit payload"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;