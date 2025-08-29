import mongoose from 'mongoose';
import { BrandSchema } from '../../infrastructure/database/mongoose/schemas/BrandSchema';

export const  brandDB = mongoose.model('Brand', BrandSchema);