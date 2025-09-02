import mongoose from 'mongoose';
import { userSchema } from '../../infrastructure/database/schemas/UserSchema';

export const userDB = mongoose.model('user', userSchema);
