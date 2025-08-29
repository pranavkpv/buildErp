import mongoose from 'mongoose';
import { TransferSchema } from '../../infrastructure/database/mongoose/schemas/TransferSchema';

export const transferDB = mongoose.model('transfer',TransferSchema);