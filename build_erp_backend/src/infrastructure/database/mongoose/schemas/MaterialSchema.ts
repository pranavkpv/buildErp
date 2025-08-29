import mongoose from 'mongoose';
import { IMaterialModelEntity } from '../../../../domain/Entities/modelEntities/material.entity';

export const MaterialSchema = new mongoose.Schema<IMaterialModelEntity>({
    material_name: {
        type: String,
        required: true,
    },
    category_id: {
        type: String,
        required:true,
    },
    brand_id: {
        type: String,
        required:true,
    },
    unit_id:{
        type:String,
        required:true,
    },
    unit_rate: {
        type: Number,
        required:true,
    },
    stock: {
        type: Number,
        required:true,
    },
},{ timestamps:true });

