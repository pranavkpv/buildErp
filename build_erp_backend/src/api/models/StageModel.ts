import mongoose from 'mongoose';
import { StageSchema } from '../../infrastructure/database/schemas/StageSchema';

export const stageDB = mongoose.model('Stage', StageSchema);