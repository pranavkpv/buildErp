import mongoose from 'mongoose';
import { EstimationLabourSchema } from '../../infrastructure/database/schemas/EstimationLabourSchema';

export const estimationLabourDB = mongoose.model('Estimation_Labour', EstimationLabourSchema);