import mongoose from 'mongoose';
import { TempUserSchema } from '../../infrastructure/database/schemas/TempUserSchema';

export const tempUserDB = mongoose.model('TempUser',TempUserSchema);