import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { INotificationMapper } from '../../../domain/IMappers/INotification.mapper';
import { notificationSuccessMessage } from '../../../Shared/Messages/Notification.message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { notificationDTO } from '../../dto/notification.dto';
import { IFetchNotificationUseCase } from '../../IUseCases/INotification/IFetchNotification';

export class FetchNotificationUseCase implements IFetchNotificationUseCase {
    constructor(
      private _notificationRepository: INotificationRepository,
      private _notificationMapper: INotificationMapper,
    ) { }
    async execute(userId: string): Promise<commonOutput<notificationDTO[]>> {
        const data = await this._notificationRepository.fetchNotification(userId);
        const mappedData = this._notificationMapper.toFetchNotificationDTO(data);
        return ResponseHelper.success(notificationSuccessMessage.FETCH, mappedData);
    }
}