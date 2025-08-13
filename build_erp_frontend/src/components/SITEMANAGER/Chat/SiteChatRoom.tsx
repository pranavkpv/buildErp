import { jwtDecode } from "jwt-decode";
import { socket } from "../../../api/socket";
import { fetchMessagesApi } from "../../../api/User/project";
import { useEffect, useState } from "react";



interface Message {
   id: string;
   message: string;
   senderId: string;
   receiverId: string
   createdAt: Date;
}

interface ChatRoomProps {
   username: string;
   userId: string | null
}

function SiteChatRoom({ username, userId }: ChatRoomProps) {
   const [messages, setMessages] = useState<Message[]>([]);
   const [newMessage, setNewMessage] = useState<string>("");

   const accessToken = localStorage.getItem("accessToken")
   if(accessToken){
        var decoded:{userId:string} = jwtDecode(accessToken);
   }else{
      return
   }


   const messageFetch = async () => {
      const response = await fetchMessagesApi(userId)
      if (response.success) {
         setMessages(response.data)
      }
   }

   useEffect(() => {
      messageFetch();
      socket.emit("joinRoom", { senderId: decoded?.userId, receiverId: userId });
      socket.on("receiveMessage", (message) => {
         setMessages(prev => [...prev, message]);
      });
      return () => {
         socket.off("receiveMessage");
      };

   }, []);
   const handleSendMessage = () => {
      console.log(decoded?.userId)
      console.log(userId)
      if (newMessage.trim()) {
         socket.emit("sendMessage", { senderId: decoded?.userId, receiverId: userId, message: newMessage });
         setNewMessage("");
      }
   };

   return (
      <div className="h-full flex flex-col">
         <h2 className="text-2xl font-bold text-teal-600 mb-6">
            Chat with {username}
         </h2>
         <div className="flex-1 overflow-y-auto bg-slate-100 rounded-lg p-4 space-y-4 mb-4">
            {messages.map((msg) => (
               <div
                  key={msg.id}
                  className={`flex ${ msg.senderId === decoded?.userId ? "justify-end" : "justify-start" }`}
               >
                  <div
                     className={`max-w-xs p-3 rounded-lg ${ msg.senderId === decoded?.userId
                        ? "bg-teal-500 text-white"
                        : "bg-white text-slate-800"
                        }`}
                  >
                     <p>{msg.message}</p>
                     <p className="text-xs text-slate-900 mt-1">
                        {msg.createdAt.toString()}
                     </p>
                  </div>
               </div>
            ))}
         </div>
         <div className="flex">
            <input
               type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder="Type your message..."
               className="flex-1 p-3 border border-slate-300 rounded-l-lg focus:outline-none focus:border-teal-500"
            />
            <button
               onClick={handleSendMessage}
               className="px-6 py-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition-colors duration-300"
            >
               Send
            </button>
         </div>
      </div>
   );
}

export default SiteChatRoom;