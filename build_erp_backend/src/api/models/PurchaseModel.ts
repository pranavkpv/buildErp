import mongoose from 'mongoose';
import { PurchaseSchema } from '../../infrastructure/database/mongoose/schemas/PurchaseSchema';

export const purchaseDB = mongoose.model('purchase',PurchaseSchema);