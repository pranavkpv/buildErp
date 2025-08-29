import mongoose from 'mongoose';
import { EstimationAdditionalSchema } from '../../infrastructure/database/mongoose/schemas/EstimationAdditionalSchema';


export const estimationAdditionalDB = mongoose.model('Estimation_additional', EstimationAdditionalSchema);