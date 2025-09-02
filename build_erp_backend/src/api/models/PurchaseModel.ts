import mongoose from 'mongoose';
import { PurchaseSchema } from '../../infrastructure/database/schemas/PurchaseSchema';

export const purchaseDB = mongoose.model('purchase',PurchaseSchema);