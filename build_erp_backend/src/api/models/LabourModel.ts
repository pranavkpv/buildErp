import mongoose from 'mongoose';
import { LabourSchema } from '../../infrastructure/database/mongoose/schemas/LabourSchema';

export const labourDB = mongoose.model('Labour', LabourSchema);