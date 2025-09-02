import mongoose from 'mongoose';
import { TransferSchema } from '../../infrastructure/database/schemas/TransferSchema';

export const transferDB = mongoose.model('transfer',TransferSchema);