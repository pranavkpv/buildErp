import mongoose from 'mongoose';
import { SpecSchema } from '../../infrastructure/database/schemas/SpecSchema';

export const specDB = mongoose.model('Spec', SpecSchema);