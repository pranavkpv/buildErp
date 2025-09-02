import mongoose from 'mongoose';
import { IEstimationLabourModelEntity } from '../../../domain/Entities/modelEntities/estimationLabour.entity';


export const EstimationLabourSchema = new mongoose.Schema<IEstimationLabourModelEntity>({
    labour_id: {
        type: String,
        required: true,
    },
    numberoflabour: {
        type: Number,
        required: true,
    },
    daily_wage: {
        type: Number,
        required: true,
    },
    project_id: {
        type: String,
        required: true,
    },
}, { timestamps: true });


