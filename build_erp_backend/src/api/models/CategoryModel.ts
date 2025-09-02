import mongoose from 'mongoose';
import { CategorySchema } from '../../infrastructure/database/schemas/CategorySchema';

export const categoryDB = mongoose.model('Category', CategorySchema);