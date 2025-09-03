import mongoose from 'mongoose';
import { ISpecModelEntity } from '../../../domain/Entities/modelEntities/spec.entity';

export const SpecSchema = new mongoose.Schema<ISpecModelEntity>({
    spec_id: {
        type: String,
        required: true,
    },
    spec_name: {
        type: String,
        required: true,
    },
    spec_unit: {
        type: String,
        required: true,
    }, description: {
        type: String,
    },
    materialDetails: [{
        material_id: {
            type: String,
        },
        quantity: {
            type: Number,
        },
    }], labourDetails: [{
        labour_id: {
            type: String,
        },
        numberoflabour: {
            type: Number,
        },
    }], additionalExpense_per: {
        type: Number,
    },
    profit_per: {
        type: Number,
    },
    blockStatus: {
        type: Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });















