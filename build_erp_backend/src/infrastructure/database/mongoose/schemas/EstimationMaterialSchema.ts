import mongoose from 'mongoose';
import { IEstimationMaterialModelEntity } from '../../../../domain/Entities/modelEntities/estimationMaterial.entity';

export const EstimationMaterialSchema = new mongoose.Schema<IEstimationMaterialModelEntity>({
    material_id:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    unit_rate:{
        type:Number,
        required:true,
    },
    project_id:{
        type:String,
        required:true,
    },
},{ timestamps:true });

