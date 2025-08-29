import mongoose from 'mongoose';
import { IUserModelEntity } from '../../../../domain/Entities/modelEntities/user.entity';

export const userSchema = new mongoose.Schema<IUserModelEntity>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
    },
    googleId:{
        type:String,
    },

}, { timestamps: true });
