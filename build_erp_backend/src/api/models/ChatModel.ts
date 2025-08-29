import mongoose from 'mongoose';
import { ChatSchema } from '../../infrastructure/database/mongoose/schemas/ChatSchema';


export const chatDB = mongoose.model('chat',ChatSchema);