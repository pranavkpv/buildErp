import mongoose from 'mongoose';
import { INotificationModelEntity } from '../../../domain/Entities/modelEntities/INotification.entity';


export const NotificationSchema = new mongoose.Schema<INotificationModelEntity>({
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default:false,
    },
    userId: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
}, { timestamps: true });

