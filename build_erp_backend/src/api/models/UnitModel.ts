import mongoose from 'mongoose';
import { UnitSchema } from '../../infrastructure/database/schemas/UnitSchema';

export const unitDB = mongoose.model('Unit', UnitSchema);