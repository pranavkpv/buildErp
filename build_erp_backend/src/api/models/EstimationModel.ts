import mongoose from 'mongoose';
import { EstimationSchema } from '../../infrastructure/database/schemas/EstimationSchema';

export const estimationDB = mongoose.model('Estimation', EstimationSchema);