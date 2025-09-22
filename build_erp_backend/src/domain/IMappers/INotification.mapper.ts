import { notificationDTO } from '../../application/dto/notification.dto';
import { INotificationModelEntity } from '../Entities/modelEntities/INotification.entity';

export interface INotificationMapper {
   toFetchNotificationDTO(input:INotificationModelEntity[]):notificationDTO[]
}