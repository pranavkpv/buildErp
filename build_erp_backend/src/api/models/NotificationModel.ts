import mongoose from 'mongoose';
import { NotificationSchema } from '../../infrastructure/database/schemas/NotificationSchema';

export const notificationDB = mongoose.model('Notification', NotificationSchema);