import mongoose from 'mongoose';
import { IChatModelEntity } from '../../../domain/Entities/modelEntities/chat.entity';



export const ChatSchema = new mongoose.Schema<IChatModelEntity> ({
    senderId:{
        type:String,
    },
    receiverId:{
        type:String,
    },
    message:{
        type:String,
    },
    messageStatus:{
        type:String
    }
},{ timestamps:true });

