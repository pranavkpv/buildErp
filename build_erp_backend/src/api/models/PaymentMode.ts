import mongoose from 'mongoose';
import { IPaymentModelEntity } from '../../domain/Entities/modelEntities/payment.entity';
import { PaymentSchema } from '../../infrastructure/database/schemas/PaymentSchema';

export const paymentDB = mongoose.model<IPaymentModelEntity>('Payment', PaymentSchema);
