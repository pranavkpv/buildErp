import mongoose from 'mongoose';
import { IEstimationAdditionalModalEntity } from '../../../domain/Entities/modelEntities/estimationAdditional.entity';

export const EstimationAdditionalSchema = new mongoose.Schema<IEstimationAdditionalModalEntity>({
    additionalExpense_per:{
        type:Number,

    },
    additionalExpense_amount:{
        type:Number,

    },
    profit_per:{
        type:Number,

    },
    profit_amount:{
        type:Number,

    },
    project_id:{
        type:String,
    },
},{ timestamps:true });
