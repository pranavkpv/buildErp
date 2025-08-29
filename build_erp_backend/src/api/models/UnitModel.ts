import mongoose from 'mongoose';
import { UnitSchema } from '../../infrastructure/database/mongoose/schemas/UnitSchema';

export const unitDB = mongoose.model('Unit', UnitSchema);