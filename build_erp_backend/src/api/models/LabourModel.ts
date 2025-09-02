import mongoose from 'mongoose';
import { LabourSchema } from '../../infrastructure/database/schemas/LabourSchema';

export const labourDB = mongoose.model('Labour', LabourSchema);