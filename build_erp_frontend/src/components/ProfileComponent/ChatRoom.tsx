import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { socket } from "../../api/socket";
import { fetchMessagesApi } from "../../api/userprofile";
import { toast } from "react-toastify";

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
    if (!newMessage.trim()) return toast.error("Message cannot be empty");
    if (!user?._id || !sitemanagerId)
      return toast.error("Cannot send message: Invalid user");

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
    return `${hours}:${minutes}${ampm}`;
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
    if (status === "send") return "✓";
    if (status === "delivered") return "✓✓";
    if (status === "seen") return "✓✓ (blue)";
    return "";
  };

  const grouped = groupMessages(messages);

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-teal-600">
          Chat with {sitemanagerName}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-6">
        {grouped.map((group) => (
          <div key={group.date}>
            <div className="text-center mb-2">
              <span className="px-3 py-1 text-xs bg-slate-300 rounded-full text-slate-700">
                {group.date === convertDate(new Date()) ? "Today" : group.date}
              </span>
            </div>
            {group.messages.map((msg) => (
              <div
                key={msg.id}
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
        ))}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-slate-200 flex"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-slate-300 rounded-l-xl focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="px-6 py-3 bg-teal-500 text-white rounded-r-xl hover:bg-teal-600 transition-colors duration-300 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
