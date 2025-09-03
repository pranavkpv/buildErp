import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { SitemanagerFailedMessage } from '../../../Shared/Messages/Sitemanager.Message';
import { userFailedMessage } from '../../../Shared/Messages/User.Message';

//stage staus change validation
export const validateStatusChange = (req: Request, res: Response, next: NextFunction): void => {
    const stageId = req.params.id;
    const { newProgress, date } = req.body;


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


//add sitemanager to project validation
export const validateAddSitemanager = (req: Request, res: Response, next: NextFunction): void => {
    const { username, email } = req.body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.USER_NAME_REQUIRED });
        return;
    }
    if (username.length < 3) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.USERNAME_MIN });
        return;
    }
    if (username.length > 30) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.USER_NAME_MAX });
        return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.USERNAME_EXIST });
        return;
    }
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.EMAIL_REQUIRED });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.INVALID_EMAIL });
        return;
    }
    if (email.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: SitemanagerFailedMessage.EMAIL_MAX });
        return;
    }

    next();
};

// sitemanager login validation
export const validateSitemanagerLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SitemanagerFailedMessage.EMAIL_REQUIRED });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SitemanagerFailedMessage.INVALID_EMAIL });
        return;
    }
    if (email.length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SitemanagerFailedMessage.EMAIL_MAX });
        return;
    }
    if (password.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SitemanagerFailedMessage.PASSWORD_REQUIRED });
        return;
    }
    if (password.trim().length < 6) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SitemanagerFailedMessage.PASSWORD_MIN });
        return;
    }
    if (password.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SitemanagerFailedMessage.PASSWORD_MAX });
        return;
    }
    next();
};

//validation of change password of sitemanager 

export const validateSitemanagerChangePassword = (req: Request, res: Response, next: NextFunction): void => {
    const { password, changedpassword } = req.body;
    if (!password || password.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: userFailedMessage.PASSWORD_REQUIRED });
        return;
    }
    const trimmedPassword = changedpassword.trim();
    if (trimmedPassword.length < 8) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: userFailedMessage.MIN_LIMIT_PASSWORD });
        return;
    }

    if (trimmedPassword.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: userFailedMessage.MAX_LIMIT_PASSWORD });
        return;
    }

    const hasUpper = /[A-Z]/.test(trimmedPassword);
    const hasLower = /[a-z]/.test(trimmedPassword);
    const hasNumber = /[0-9]/.test(trimmedPassword);
    const hasSpecial = /[@$!%*?&]/.test(trimmedPassword);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: userFailedMessage.WEAK_PASSWORD });
        return;
    }
    next();
};

