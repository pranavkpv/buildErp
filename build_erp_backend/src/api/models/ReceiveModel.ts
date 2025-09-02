import mongoose from 'mongoose';
import { ReceiveSchema } from '../../infrastructure/database/schemas/ReceiveSchema';


export const receiveDB = mongoose.model('receive',ReceiveSchema);