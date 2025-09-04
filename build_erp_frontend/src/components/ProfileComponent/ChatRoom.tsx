import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { socket } from "../../api/socket";
import { fetchMessagesApi } from "../../api/userprofile";

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
   const [showMessage, setShowMessage] = useState<DisplayMessage[]>([]);
   const user = useSelector((state: RootState) => state.auth.user);


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

   const messageFetch = async () => {
      const response = await fetchMessagesApi(sitemanagerId);
      if (response.success) {
         const x: Message[] = response.data.map((element: any) => ({
            id: element.id,
            message: element.message,
            senderId: element.senderId,
            receiverId: element.receiverId,
            time: convertTime(element.createdAt),
            date: convertDate(element.createdAt),
         }));

         setMessages(x);
         setShowMessage(groupMessages(x));
      }
   };

   useEffect(() => {
      messageFetch();

      socket.emit("joinRoom", { senderId: user?._id, receiverId: sitemanagerId });

      socket.on("receiveMessage", (message: ReceiveMessage) => {
         const formatted: Message = {
            ...message,
            time: convertTime(message.createdAt),
            date: convertDate(message.createdAt),
         };

         setMessages((prev) => {
            const updated = [...prev, formatted];
            setShowMessage(groupMessages(updated)); 
            return updated;
         });
      });

      return () => {
         socket.off("receiveMessage");
      };
   }, []);

   const handleSendMessage = () => {
      if (newMessage.trim()) {
         socket.emit("sendMessage", {
            senderId: user?._id,
            receiverId: sitemanagerId,
            message: newMessage,
         });
         setNewMessage("");
      }
   };

   const convertTime = (dateInput: Date) => {
      const date = new Date(dateInput);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${ hours }:${ minutes }${ ampm }`;
   };

   const convertDate = (dateInput: Date) => {
      const date = new Date(dateInput);
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear().toString();
      return `${ day }-${ month }-${ year }`;
   };

   return (
      <div className="h-full flex flex-col bg-white rounded-xl shadow-md">
         <div className="p-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-teal-600">
               Chat with {sitemanagerName}
            </h2>
         </div>

         <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-6">
            {showMessage.map((group) => (
               <div key={group.date}>
                  <div className="text-center mb-2">
                     <span className="px-3 py-1 text-xs bg-slate-300 rounded-full text-slate-700">
                        {group.date == convertDate(new Date()) ? "Today" : group.date}
                     </span>
                  </div>
                  {group.messages.map((msg) => (
                     <div
                        key={msg.id}
                        className={`flex mb-2 ${ msg.senderId === user?._id ? "justify-end" : "justify-start"
                           }`}
                     >
                        <div
                           className={`max-w-xs p-3 rounded-2xl shadow ${ msg.senderId === user?._id
                                 ? "bg-teal-500 text-white rounded-br-none"
                                 : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                              }`}
                        >
                           <p className="break-words">{msg.message}</p>
                           <p className="text-[10px] text-slate-700 mt-1 text-right">
                              {msg.time}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            ))}
         </div>

         <div className="p-3 border-t border-slate-200 flex">
            <input
               type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder="Type your message..."
               className="flex-1 p-3 border border-slate-300 rounded-l-xl focus:outline-none focus:border-teal-500"
            />
            <button
               onClick={handleSendMessage}
               className="px-6 py-3 bg-teal-500 text-white rounded-r-xl hover:bg-teal-600 transition-colors duration-300"
            >
               Send
            </button>
         </div>
      </div>
   );
}

export default ChatRoom;
