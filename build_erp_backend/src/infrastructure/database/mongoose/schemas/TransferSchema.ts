import mongoose from 'mongoose';
import { ITransferModelEntity } from '../../../../domain/Entities/modelEntities/transfer.entity';



export const TransferSchema = new mongoose.Schema<ITransferModelEntity>({
    from_project_id: {
        type: String,
    },
    to_project_id: {
        type: String,
    },
    approval_status: {
        type: Boolean,
    },
    date: {
        type: Date,
    },
    description: {
        type: String,
    },
    transfer_id: {
        type: String,
    },
    receive_status :{
        type:Boolean,
    },
    materialDetails: [
        {
            material_id: {
                type: String,
            },
            quantity: {
                type: Number,
            },
            unit_rate: {
                type: Number,
            },
        },
    ],
}, { timestamps: true });

