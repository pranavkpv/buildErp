import mongoose from 'mongoose';
import { EstimationAdditionalSchema } from '../../infrastructure/database/schemas/EstimationAdditionalSchema';


export const estimationAdditionalDB = mongoose.model('Estimation_additional', EstimationAdditionalSchema);