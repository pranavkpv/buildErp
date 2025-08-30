import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { adminFailedMessage } from '../../../Shared/Messages/Admin.message';


export const validateAdminLogin = (req: Request,res: Response,next: NextFunction,): void => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: adminFailedMessage.LOGIN_REQUIRED_FIELD });
            return;
        }

        if (username.trim().length < 3) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: adminFailedMessage.USER_NAME_MAX });
            return;
        }

        if (password.length < 6) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: adminFailedMessage.PASSWORD_MAX });
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: adminFailedMessage.PASSWORD_EXIST });
            return;
        }

        next();
    } catch (error) {
        next(error);
    }
};
