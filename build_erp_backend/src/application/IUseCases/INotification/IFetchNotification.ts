import { commonOutput } from '../../dto/common';
import { notificationDTO } from '../../dto/notification.dto';

export interface IFetchNotificationUseCase {
   execute(userId:string):Promise<commonOutput<notificationDTO[]>>
}