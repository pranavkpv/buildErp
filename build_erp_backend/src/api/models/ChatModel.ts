import mongoose from 'mongoose';
import { ChatSchema } from '../../infrastructure/database/schemas/ChatSchema';


export const chatDB = mongoose.model('chat',ChatSchema);