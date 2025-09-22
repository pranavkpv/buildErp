import { commonOutput } from '../../dto/common';

export interface IUpdateReadNotificationUseCase {
   execute(notificationId: string): Promise<commonOutput>
}