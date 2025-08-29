import mongoose from 'mongoose';
import { StageSchema } from '../../infrastructure/database/mongoose/schemas/StageSchema';

export const stageDB = mongoose.model('Stage', StageSchema);