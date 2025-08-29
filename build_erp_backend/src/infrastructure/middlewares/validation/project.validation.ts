import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';

export const validateProjectAdd = (req: Request, res: Response, next: NextFunction): void => {
    const { project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = req.body;
    if (!project_name || !user_id || !address || !mobile_number || !email) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false,message: ProjectFailedMessage.REQUIRED_FIELD });
        return;
    }
    if (typeof project_name !== 'string' || project_name.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.PROJECT_NAME_CHAR });
        return;
    }
    if (project_name.length > 100) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.PROJECT_NAME_MAX });
        return;
    }
    if (typeof user_id !== 'string' && typeof user_id !== 'number') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.USER_VALID });
        return;
    }

    if (typeof address !== 'string' || address.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.ADDRESS_NON_EMPTY });
        return;
    }
    if (address.length > 200) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.ADDRESS_MAX });
        return;
    }
    if (typeof mobile_number !== 'string' && typeof mobile_number !== 'number') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.MOBILE_CHAR });
        return;
    }
    const mobileStr = String(mobile_number);
    if (!/^\d{10,15}$/.test(mobileStr)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.MOBILE_MAX });
        return;
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.EMAIL_VALLID });
        return;
    }

    if (area !== undefined && typeof area !== 'string' && typeof area !== 'number') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.AREA_VALID });
        return;
    }
    if (description !== undefined) {
        if (typeof description !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.DESCRIPTION_VALID });
            return;
        }
        if (description.length > 500) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.DESCRIPTION_MAX });
            return;
        }
    }
    if (latitude !== undefined) {
        if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.LATITUDE_CHAR });
            return;
        }
    }

    if (longitude !== undefined) {
        if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success:false, message: ProjectFailedMessage.LONGITUDE_CHAR });
            return;
        }
    }
    next();
};
