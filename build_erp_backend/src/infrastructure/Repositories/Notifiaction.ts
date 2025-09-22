import { notificationDB } from '../../api/models/NotificationModel';
import { INotificationRepository } from '../../domain/Entities/IRepository/INotification';
import { INotificationModelEntity } from '../../domain/Entities/modelEntities/INotification.entity';

export class NotificationRepostory implements INotificationRepository {
    async saveNotication(date: Date, description: string, userId: string): Promise<void> {
        const newNotification = new notificationDB({
            date,
            description,
            userId,
        });
        await newNotification.save();
    }
    async fetchNotification(userId: string): Promise<INotificationModelEntity[]> {
        return await notificationDB.find({ userId: userId });
    }
    async updateNoticationRead(notificationId: string): Promise<void> {
        await notificationDB.findByIdAndUpdate(notificationId, { read: true });
    }
}