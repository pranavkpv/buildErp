import mongoose from "mongoose";
import { IChatModel } from "../Model/ChatModel";



export const ChatSchema = new mongoose.Schema<IChatModel> ({
   senderId:{
      type:String
   },
   receiverId:{
      type:String
   },
   message:{
      type:String
   }
},{timestamps:true})

