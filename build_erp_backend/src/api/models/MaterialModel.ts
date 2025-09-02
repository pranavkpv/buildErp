import mongoose from 'mongoose';
import { MaterialSchema } from '../../infrastructure/database/schemas/MaterialSchema';

export const materialDB = mongoose.model('Material', MaterialSchema);