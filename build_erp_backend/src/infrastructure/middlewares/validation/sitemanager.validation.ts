import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { SitemanagerFailedMessage } from '../../../Shared/Messages/Sitemanager.Message';

export const validateStatusChange = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const stageId = req.params.id;
    const {  newProgress, date } = req.body;

  
    if (!stageId || typeof stageId !== 'string' || stageId.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.STAGE_ID_REQUIRED,
        });
        return;
    }

    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(stageId)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.STAGE_ID_FORMAT,
        });
        return;
    }

    // ===== Validate newProgress =====
    if (
        newProgress === undefined ||
    newProgress === null ||
    isNaN(newProgress)
    ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.PROGRESS_REQUIRED,
        });
        return;
    }

    if (typeof newProgress !== 'number') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.PROGRESS_NUMBER,
        });
        return;
    }

    if (newProgress < 0 || newProgress > 100) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.PROGRESS_BETWEEN,
        });
        return;
    }

    // ===== Validate date =====
    if (!date || typeof date !== 'string' || date.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.DATE_REQUIRE,
        });
        return;
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.DATE_FORMAT,
        });
        return;
    }

    const today = new Date();
    if (parsedDate > today) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SitemanagerFailedMessage.DATE_CANNOT_FUTURE,
        });
        return;
    }

    next();
};



export const validateAddSitemanager = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const { username, email } = req.body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: SitemanagerFailedMessage.USER_NAME_REQUIRED });
        return;
    }
    if (username.length < 3) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message:SitemanagerFailedMessage.USERNAME_MIN });
        return;
    }
    if (username.length > 30) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: SitemanagerFailedMessage.USER_NAME_MAX });
        return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: SitemanagerFailedMessage.USERNAME_EXIST });
        return;
    }
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: SitemanagerFailedMessage.EMAIL_REQUIRED });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: SitemanagerFailedMessage.INVALID_EMAIL });
        return;
    }
    if (email.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: SitemanagerFailedMessage.EMAIL_MAX });
        return;
    }

    next();
};

