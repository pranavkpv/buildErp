import { NotificationMapper } from '../../application/Mapper/notification.mapper';
import { JwtService } from '../../application/services/JwtService';
import { FetchNotificationUseCase } from '../../application/UseCase/Notification/FetchNotification';
import { UpdateReadNotifaicationUseCase } from '../../application/UseCase/Notification/UpdateReadNotification';
import { NotificationRepostory } from '../../infrastructure/Repositories/Notifiaction';
import { NotificationController } from '../controllers/Notification';

const notificationRepository = new NotificationRepostory();
const notificationMapper = new NotificationMapper();
const jwtservice = new JwtService();
const fetchNotificationUseCase = new FetchNotificationUseCase(notificationRepository,notificationMapper);
const updateReadNotificationUseCase = new UpdateReadNotifaicationUseCase(notificationRepository);
export const injectedNotificationController = new NotificationController(fetchNotificationUseCase,updateReadNotificationUseCase,jwtservice);