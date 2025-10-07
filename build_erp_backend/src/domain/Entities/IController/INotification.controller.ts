import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { notificationDTO } from '../../../application/dto/notification.dto';

export interface INotificationController {
   fetchUserBaseNotification(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<notificationDTO[]> | commonOutput | void>

   markReadInNotification(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>
}