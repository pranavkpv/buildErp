import mongoose from 'mongoose';
import { EstimationMaterialSchema } from '../../infrastructure/database/schemas/EstimationMaterialSchema';

export const estimationMaterialDB = mongoose.model('Estimation_material', EstimationMaterialSchema);