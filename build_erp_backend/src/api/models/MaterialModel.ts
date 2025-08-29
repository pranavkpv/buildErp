import mongoose from 'mongoose';
import { MaterialSchema } from '../../infrastructure/database/mongoose/schemas/MaterialSchema';

export const materialDB = mongoose.model('Material', MaterialSchema);