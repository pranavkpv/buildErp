import mongoose from 'mongoose';
import { EstimationMaterialSchema } from '../../infrastructure/database/mongoose/schemas/EstimationMaterialSchema';

export const estimationMaterialDB = mongoose.model('Estimation_material', EstimationMaterialSchema);