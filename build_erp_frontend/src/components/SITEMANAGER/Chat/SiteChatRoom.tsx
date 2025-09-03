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
   createdAt: string;
}

interface receiveMessage {
   id: string;
   message: string;
   senderId: string;
   receiverId: string;
   createdAt: Date
}

interface ChatRoomProps {
   username: string;
   userId: string | null;
}

interface DecodedToken {
   _id: string
   username: string
   role: string
   iat: number
   exp: number
}

function SiteChatRoom({ username, userId }: ChatRoomProps) {
   const [messages, setMessages] = useState<Message[]>([]);
   const [newMessage, setNewMessage] = useState<string>("");
   const [decoded, setDecoded] = useState<DecodedToken | null>(null);

   // Handle token decoding
   useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
         try {
            const decodedToken: DecodedToken = jwtDecode(accessToken);
            setDecoded(decodedToken)
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
            let x = response.data.map((element: any) => ({
               id: element.id,
               message: element.message,
               senderId: element.senderId,
               receiverId: element.receiverId,
               createdAt: convertTime(element.createdAt)
            }));
            setMessages(x);
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         toast.error("Failed to fetch messages");
         console.error("Error fetching messages:", error);
      }
   };

   // Join chat room and handle real-time messages
   useEffect(() => {
      if (!decoded?._id || !userId) {
         return
      };

      messageFetch();
      socket.emit("joinRoom", { senderId: decoded._id, receiverId: userId });
      socket.on("receiveMessage", (message: receiveMessage) => {
         setMessages((prev) => [...prev, { ...message, createdAt: convertTime(message.createdAt) }]);
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
            <p className="text-base text-gray-400">Unable to load chat. Please try again.</p>
         </div>
      );
   }

   const convertTime = (dateInput: string | Date) => {
      const date = typeof dateInput === "string" ? new Date(dateInput) : new Date(dateInput.getTime());
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; 

      return `${ hours }:${ minutes }${ ampm }`;
   };



   return (
      <div className="h-full flex flex-col bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
         <h2 className="text-xl font-semibold text-gray-100 mb-6">
            Chat with {username}
         </h2>
         <div
            className="flex-1 overflow-y-auto bg-gray-800/50 rounded-lg p-4 space-y-4 mb-4"
            role="log"
            aria-live="polite"
         >
            {messages.length === 0 ? (
               <div className="text-center text-gray-400 text-sm">
                  No messages yet. Start the conversation!
               </div>
            ) : (
               messages.map((msg) => (
                  <div
                     key={msg.id}
                     className={`flex ${ msg.senderId === decoded._id ? "justify-end" : "justify-start"
                        }`}
                  >
                     <div
                        className={`max-w-xs p-3 rounded-lg shadow-md ${ msg.senderId === decoded._id
                           ? "bg-teal-600/90 text-gray-100"
                           : "bg-gray-700/50 text-gray-100"
                           }`}
                     >
                        <p>{msg.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                           {msg.createdAt}
                        </p>
                     </div>
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