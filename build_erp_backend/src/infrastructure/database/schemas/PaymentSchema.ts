import mongoose from 'mongoose';
import { IPaymentModelEntity } from '../../../domain/Entities/modelEntities/payment.entity';


export const PaymentSchema = new mongoose.Schema<IPaymentModelEntity>({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['stripe', 'wallet'],
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failed','verified'],
        required: true,
    },
    stage_id: {
        type: String,
        required: true,
    },
    stripeSessionId: {
        type: String,
    },
}, { timestamps: true });

