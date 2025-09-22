import { INotificationModelEntity } from '../../domain/Entities/modelEntities/INotification.entity';
import { INotificationMapper } from '../../domain/IMappers/INotification.mapper';
import { notificationDTO } from '../dto/notification.dto';

export class NotificationMapper implements INotificationMapper {
    toFetchNotificationDTO(input: INotificationModelEntity[]): notificationDTO[] {
        return input.map((element)=>(
            {
                _id:element._id,
                date:element.date,
                description:element.description,
                read:element.read,
                userId:element.userId,
                url:element.url,
            }
        ));
    }
}