import { Request, Response, NextFunction } from 'express';
import { commonOutput } from '../../application/dto/common';
import { notificationDTO } from '../../application/dto/notification.dto';
import { INotificationController } from '../../domain/Entities/IController/INotification.controller';
import { ResponseHelper } from '../../Shared/responseHelpers/response';
import { IJwtService } from '../../domain/Entities/Service.Entities/IJwtservice';
import { IFetchNotificationUseCase } from '../../application/IUseCases/INotification/IFetchNotification';
import { IUpdateReadNotificationUseCase } from '../../application/IUseCases/INotification/IUpdateReadNotification';
import { Role } from '../../Shared/Constants/Role.constant';

export class NotificationController implements INotificationController {
    constructor(
      private _fetchNotificationUseCase: IFetchNotificationUseCase,
      private _updateReadNotificationUseCase: IUpdateReadNotificationUseCase,
      private _jwtservice: IJwtService,
    ) { }
    fetchUserBaseNotification = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<notificationDTO[]> | commonOutput | void> => {
        try {
            const userHeader = req.headers.authorization;
            const accessToken = userHeader?.split(' ')[1];
            if (!accessToken) return ResponseHelper.unAuthor();

            const payload = await this._jwtservice.verifyAccessToken(accessToken);
            if (!payload) return ResponseHelper.unAuthor();
            if (payload.role === Role.ADMIN) {
                const result = await this._fetchNotificationUseCase.execute(payload.role);
                return result;
            }
            console.log(payload._id);
            const result = await this._fetchNotificationUseCase.execute(payload._id);
            return result;
        } catch (error) {
            next(error);
        }
    };
    markReadInNotification = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void> => {
        try {
            const notificationId = req.params.id;
            const result = await this._updateReadNotificationUseCase.execute(notificationId);
            return result;
        } catch (error) {
            next(error);
        }
    };
}