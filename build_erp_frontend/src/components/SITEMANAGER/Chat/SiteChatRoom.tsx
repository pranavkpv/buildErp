import { jwtDecode } from "jwt-decode";
import { socket } from "../../../api/socket";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchMessagesApiInSitemanager } from "../../../api/Sitemanager/profile";

interface Message {
  _id: string;
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
  createdAt: Date;
}

interface ChatRoomProps {
  username: string;
  userId: string | null;
}

interface DecodedToken {
  _id: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

interface DisplayMessage {
  date: string;
  messages: Message[];
}

function SiteChatRoom({ username, userId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
  const user:DecodedToken | null = accessToken ?  jwtDecode(accessToken):null;
  console.log(user)


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
    if (!userId) return;
    try {
      const response = await fetchMessagesApiInSitemanager(userId);
      if (response.success) {
        const x: Message[] = response.data.map((element: any) => ({
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
      toast.error("Failed to fetch messages");
    }
  };

  const handleReceiveMessage = useCallback(
    (message: ReceiveMessage) => {
      const formatted: Message = {
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
          return prev.map((m) =>
            m._id === formatted._id ? { ...m, messageStatus: formatted.messageStatus } : m
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
      if(!user) return

      if (
        formatted.receiverId === user._id &&
        formatted.messageStatus === "send"
      ) {
        socket.emit("messageDelivered", {
          messageId: formatted._id,
          senderId: formatted.senderId,
          receiverId: formatted.receiverId,
        });
      }
    },
    [user?._id]
  );

  useEffect(() => {
    if (!user?._id || !userId) return;

    messageFetch();
    socket.emit("joinRoom", { senderId: user._id, receiverId: userId });
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [user?._id, userId, handleReceiveMessage]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return toast.error("Message cannot be empty");
    if (!user?._id || !userId)
      return toast.error("Cannot send message: Invalid user");

    const tempId = Date.now().toString();

    const tempMsg: Message = {
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

  const convertTime = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${ hours }:${ minutes }${ ampm }`;
  };

  const convertDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    return `${ date.getDate().toString().padStart(2, "0") }-${ (
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0") }-${ date.getFullYear() }`;
  };

  const renderStatus = (status: string) => {
    if (status === "send") return "✓";
    if (status === "delivered") return "✓✓";
    if (status === "seen") return "✓✓ (blue)";
    return "";
  };

  const grouped = groupMessages(messages);

  return (
    <div className="h-full flex flex-col bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-6">
        Chat with {username}
      </h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-800/50 rounded-lg p-4 space-y-6 mb-4">
        {grouped.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          grouped.map((group) => (
            <div key={group.date}>
              <div className="text-center mb-2">
                <span className="px-3 py-1 text-xs bg-gray-600 rounded-full text-gray-200">
                  {group.date === convertDate(new Date()) ? "Today" : group.date}
                </span>
              </div>
              {group.messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex mb-2 ${
                  msg.senderId === user?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl shadow ${
                      msg.senderId === user?._id
                      ? "bg-teal-500 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  }`}
                >
                  <p className="break-words">{msg.message}</p>
                  <p className="text-[10px] text-slate-700 mt-1 text-right">
                    {msg.time}
                  </p>
                    {msg.senderId === user?._id && (
                    <p className="text-[10px] text-right mt-0.5">
                      {renderStatus(msg.messageStatus)}
                    </p>
                  )}
                </div>
              </div>
            ))}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <label htmlFor="messageInput" className="sr-only">
          Type your message
        </label>
        <input
          id="messageInput"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-gray-100 text-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 text-sm font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default SiteChatRoom;
