import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { socket } from "../../api/socket";
import { fetchMessagesApi } from "../../api/userprofile";

interface Message {
   id: string;
   message: string;
   senderId: string;
   receiverId: string
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
   sitemanagerName: string;
   sitemanagerId: string | null
}

function ChatRoom({ sitemanagerName, sitemanagerId }: ChatRoomProps) {
   const [messages, setMessages] = useState<Message[]>([]);
   const [newMessage, setNewMessage] = useState<string>("");
   const user = useSelector((state: RootState) => state.auth.user);


   const messageFetch = async () => {
      const response = await fetchMessagesApi(sitemanagerId)
      if (response.success) {
         let x = response.data.map((element: any) => ({
            id: element.id,
            message: element.message,
            senderId: element.senderId,
            receiverId: element.receiverId,
            createdAt: convertTime(element.createdAt)
         }));
         console.log(x)
         setMessages(x);
      }
   }

   useEffect(() => {
      messageFetch();
      socket.emit("joinRoom", { senderId: user?._id, receiverId: sitemanagerId });
      socket.on("receiveMessage", (message: receiveMessage) => {
         setMessages((prev) => [...prev, { ...message, createdAt: convertTime(message.createdAt) }]);
      });
      return () => {
         socket.off("receiveMessage");
      };

   }, []);
   const handleSendMessage = () => {
      if (newMessage.trim()) {
         socket.emit("sendMessage", { senderId: user?._id, receiverId: sitemanagerId, message: newMessage });
         setNewMessage("");
      }
   };

  
   const convertTime = (dateInput: Date ) => {
      const date =  new Date(dateInput);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12; 

      return `${ hours }:${ minutes }${ ampm }`;
   };


   return (
      <div className="h-full flex flex-col">
         <h2 className="text-2xl font-bold text-teal-600 mb-6">
            Chat with {sitemanagerName}
         </h2>
         <div className="flex-1 overflow-y-auto bg-slate-100 rounded-lg p-4 space-y-4 mb-4">
            {messages.map((msg) => (
               <div
                  key={msg.id}
                  className={`flex ${ msg.senderId === user?._id ? "justify-end" : "justify-start" }`}
               >
                  <div
                     className={`max-w-xs p-3 rounded-lg ${ msg.senderId === user?._id
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

export default ChatRoom;