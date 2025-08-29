import mongoose from 'mongoose';
import { ITempUserModelEntity } from '../../../../domain/Entities/modelEntities/tempUser.entity';

export const TempUserSchema = new mongoose.Schema<ITempUserModelEntity>({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
    },
    otp:{
        type:Number,
    },
    otpCreatedAt:{
        type:Date,
        default:Date.now(),
    },
});

