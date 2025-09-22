import { INotificationRepository } from '../../../domain/Entities/IRepository/INotification';
import { notificationSuccessMessage } from '../../../Shared/Messages/Notification.message';
import { ResponseHelper } from '../../../Shared/responseHelpers/response';
import { commonOutput } from '../../dto/common';
import { IUpdateReadNotificationUseCase } from '../../IUseCases/INotification/IUpdateReadNotification';

export class UpdateReadNotifaicationUseCase implements IUpdateReadNotificationUseCase {
    constructor(
      private _notificationRepository: INotificationRepository,
    ) { }
    async execute(notificationId: string): Promise<commonOutput> {
        await this._notificationRepository.updateNoticationRead(notificationId);
        return ResponseHelper.success(notificationSuccessMessage.UPDATE);
    }
}