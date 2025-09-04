import { jwtDecode } from "jwt-decode";
import { socket } from "../../../api/socket";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchMessagesApiInSitemanager } from "../../../api/Sitemanager/profile";

interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  time: string;
  date: string;
}

interface ReceiveMessage {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
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
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);
  const [showMessage, setShowMessage] = useState<DisplayMessage[]>([]);

  // ✅ group messages by date
  const groupMessages = (msgs: Message[]): DisplayMessage[] => {
    return msgs.reduce((acc: DisplayMessage[], msg) => {
      const existingGroup = acc.find((g) => g.date === msg.date);
      if (existingGroup) {
        existingGroup.messages.push(msg);
      } else {
        acc.push({ date: msg.date, messages: [msg] });
      }
      return acc;
    }, []);
  };

  // Decode token
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decodedToken: DecodedToken = jwtDecode(accessToken);
        setDecoded(decodedToken);
      } catch (error) {
        toast.error("Invalid access token");
        console.error("Error decoding token:", error);
      }
    } else {
      toast.error("No access token found");
    }
  }, []);

  // Fetch messages
  const messageFetch = async () => {
    if (!userId) {
      toast.error("No user selected for chat");
      return;
    }
    try {
      const response = await fetchMessagesApiInSitemanager(userId);
      if (response.success) {
        let x: Message[] = response.data.map((element: any) => ({
          id: element.id,
          message: element.message,
          senderId: element.senderId,
          receiverId: element.receiverId,
          time: convertTime(element.createdAt),
          date: convertDate(element.createdAt),
        }));
        setMessages(x);
        setShowMessage(groupMessages(x));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
      console.error("Error fetching messages:", error);
    }
  };

  // Join chat room and listen for messages
  useEffect(() => {
    if (!decoded?._id || !userId) return;

    messageFetch();

    socket.emit("joinRoom", { senderId: decoded._id, receiverId: userId });
    socket.on("receiveMessage", (message: ReceiveMessage) => {
      const formatted: Message = {
        ...message,
        time: convertTime(message.createdAt),
        date: convertDate(message.createdAt),
      };
      setMessages((prev) => {
        const updated = [...prev, formatted];
        setShowMessage(groupMessages(updated)); // ✅ keep grouped
        return updated;
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [decoded?._id, userId]);

  // Send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    if (!decoded?._id || !userId) {
      toast.error("Cannot send message: Invalid user");
      return;
    }
    socket.emit("sendMessage", {
      senderId: decoded._id,
      receiverId: userId,
      message: newMessage,
    });
    setNewMessage("");
  };

  if (!decoded || !userId) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800/90 rounded-xl">
        <p className="text-base text-gray-400">
          Unable to load chat. Please try again.
        </p>
      </div>
    );
  }

  // Helpers
  const convertTime = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string"
        ? new Date(dateInput)
        : new Date(dateInput.getTime());
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${ampm}`;
  };

  const convertDate = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string"
        ? new Date(dateInput)
        : new Date(dateInput.getTime());
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="h-full flex flex-col bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-6">
        Chat with {username}
      </h2>

      <div className="flex-1 overflow-y-auto bg-gray-800/50 rounded-lg p-4 space-y-6 mb-4">
        {showMessage.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          showMessage.map((group) => (
            <div key={group.date}>
              <div className="text-center mb-2">
                <span className="px-3 py-1 text-xs bg-gray-600 rounded-full text-gray-200">
                  {group.date==convertDate(String(new Date())) ? "Today" : group.date}
                </span>
              </div>
              {group.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-2 ${
                    msg.senderId === decoded._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl shadow-md ${
                      msg.senderId === decoded._id
                        ? "bg-teal-600 text-gray-100 rounded-br-none"
                        : "bg-gray-700 text-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-[10px] text-gray-300 mt-1 text-right">
                      {msg.time}
                    </p>
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
