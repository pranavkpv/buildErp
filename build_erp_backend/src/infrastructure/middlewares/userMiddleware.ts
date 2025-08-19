import { Request, Response, NextFunction } from 'express';
import { Role } from '../../Shared/Constants/Role.constant';
import { JwtService } from '../../application/services/JwtService';
import { HTTP_STATUS } from '../../Shared/statusCodes/statusCodes';
import { AuthErrorMessage } from '../../Shared/Messages/Auth.Message';

export const userMiddleware = (jwtService: JwtService) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const adminHeader = req.headers.authorization
    const accessToken = adminHeader?.split(" ")[1]
    if (!accessToken) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: AuthErrorMessage.NO_TOKEN });
      return;
    }
    const payload = jwtService.verifyAccessToken(accessToken);
    if (!payload) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: AuthErrorMessage.INVALID_ACCESS_TOKEN });
      return;
    }
    if (payload.role != Role.USER) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: AuthErrorMessage.NOT_ACCESS });
      return
    }
    next();
  };
};


