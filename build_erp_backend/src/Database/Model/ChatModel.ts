import mongoose from "mongoose";
import { IChatModelEntity } from "../../Entities/ModelEntities/Chat.Entity";
import { ChatSchema } from "../Schema/ChatSchema";

export interface IChatModel extends IChatModelEntity { }
export const chatDB = mongoose.model('chat',ChatSchema)