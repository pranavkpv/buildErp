import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../Shared/Status_code';
import { JwtService } from '../services/JwtService';
import { AuthErrorMessage } from '../Shared/Messages/Auth.Message';
import { Role } from '../Shared/ConstantValues/Role.constant';

export const adminMiddleWare = (jwtService: JwtService) => {
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
    if (payload.role != Role.ADMIN) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: AuthErrorMessage.NOT_ACCESS });
      return
    }
    next();
  };
};


