import mongoose from 'mongoose';
import { ILabourModelEntity } from '../../../../domain/Entities/modelEntities/labour.entity';


export const LabourSchema = new mongoose.Schema<ILabourModelEntity>({
    labour_type:{
        type:String,
        required:true,
    },
    daily_wage:{
        type:Number,
        required:true,
    },
},{ timestamps:true });
