import { INotificationModelEntity } from '../modelEntities/INotification.entity';

export interface INotificationRepository {
   saveNotication(date: Date, description: string, userId: string,url?:string): Promise<void>
   fetchNotification(userId: string): Promise<INotificationModelEntity[]>
   updateNoticationRead(notificationId:string): Promise<void>
}