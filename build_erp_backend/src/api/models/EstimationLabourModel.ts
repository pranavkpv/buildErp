import mongoose from 'mongoose';
import { EstimationLabourSchema } from '../../infrastructure/database/mongoose/schemas/EstimationLabourSchema';

export const estimationLabourDB = mongoose.model('Estimation_Labour', EstimationLabourSchema);