import mongoose from 'mongoose';
import { TempUserSchema } from '../../infrastructure/database/mongoose/schemas/TempUserSchema';

export const tempUserDB = mongoose.model('TempUser',TempUserSchema);