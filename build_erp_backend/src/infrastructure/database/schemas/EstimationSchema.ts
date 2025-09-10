import mongoose from 'mongoose';
import { IEstimationModelEntity } from '../../../domain/Entities/modelEntities/estimation.entity';

export const EstimationSchema = new mongoose.Schema<IEstimationModelEntity>({
    spec_id: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit_rate: {
        type: Number,
        required: true,
    },
    project_id: {
        type: String,
        required: true,
    },
    approvalStatus: {
        type: Boolean,
        required: true
    },
    rejectStatus: {
        type: Boolean,
        required: true
    },
    reason:{
        type:String
    }
}, { timestamps: true });

