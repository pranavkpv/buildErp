import mongoose from 'mongoose';
import { BrandSchema } from '../../infrastructure/database/schemas/BrandSchema';

export const  brandDB = mongoose.model('Brand', BrandSchema);