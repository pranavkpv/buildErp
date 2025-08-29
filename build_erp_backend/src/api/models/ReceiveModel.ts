import mongoose from 'mongoose';
import { ReceiveSchema } from '../../infrastructure/database/mongoose/schemas/ReceiveSchema';


export const receiveDB = mongoose.model('receive',ReceiveSchema);