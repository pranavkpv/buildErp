import mongoose from 'mongoose';
import { CategorySchema } from '../../infrastructure/database/mongoose/schemas/CategorySchema';

export const categoryDB = mongoose.model('Category', CategorySchema);