import mongoose from 'mongoose';
import { EstimationSchema } from '../../infrastructure/database/mongoose/schemas/EstimationSchema';

export const estimationDB = mongoose.model('Estimation', EstimationSchema);