import mongoose from "mongoose";
import { IChatModelEntity } from "../../domain/Entities/modelEntities/chat.entity";
import { ChatSchema } from "../../infrastructure/database/mongoose/schemas/ChatSchema";

export interface IChatModel extends IChatModelEntity { }
export const chatDB = mongoose.model('chat',ChatSchema)