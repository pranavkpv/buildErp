import mongoose from 'mongoose';
import { userSchema } from '../../infrastructure/database/mongoose/schemas/UserSchema';

export const userDB = mongoose.model('user', userSchema);
