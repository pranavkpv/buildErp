import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../application/services/JwtService';
import { HTTP_STATUS } from '../../Shared/statusCodes/statusCodes';
import { AuthErrorMessage } from '../../Shared/Messages/Auth.Message';
import { Role } from '../../Shared/Constants/Role.constant';
import redis from '../database/Redis';
import { userFailedMessage } from '../../Shared/Messages/User.Message';

export const siteManagerMiddleware = (jwtService: JwtService) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const adminHeader = req.headers.authorization
    const accessToken = adminHeader?.split(" ")[1]
    const refreshToken = req.cookies?.refreshToken;
    if (!accessToken) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({success:false, message: AuthErrorMessage.NO_TOKEN });
      return;
    }
    let blackList = await redis.get(`blackList:${ accessToken }`)
    if (blackList) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success:false,message: userFailedMessage.TOKEN_BLACK_LIST })
      return
    }
    if (!refreshToken) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success: false, message: userFailedMessage.TOKEN_EXPIRE })
      return
    }
    const payload = jwtService.verifyAccessToken(accessToken);
    if (!payload) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success:false,message: AuthErrorMessage.INVALID_ACCESS_TOKEN });
      return;
    }
    if (payload.role != Role.SITEMANAGER) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ success:false,message: AuthErrorMessage.NOT_ACCESS });
      return
    }
    next();
  };
};


