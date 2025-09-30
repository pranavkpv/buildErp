import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { unitFailedMessage } from '../../../Shared/Messages/Unit.Message';

export const validateUnitAction = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const { unit_name, short_name } = req.body;

    if (!unit_name || typeof unit_name !== 'string' || unit_name.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: unitFailedMessage.UNIT_NAME_REQUIRED,
        });
        return;
    }

    if (unit_name.trim().length < 2 || unit_name.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: unitFailedMessage.UNIT_BETWEEN,
        });
        return;
    }

    const validUnitRegex = /^[a-zA-Z0-9\s\-_&]+$/;
    if (!validUnitRegex.test(unit_name)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message:
       unitFailedMessage.INVALID_UNIT,
        });
        return;
    }

    if (!short_name || typeof short_name !== 'string' || short_name.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: unitFailedMessage.SHORT_NAME_REQUIRED,
        });
        return;
    }

    if (short_name.trim().length < 1 || short_name.length > 10) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: unitFailedMessage.SHORT_NAME_BETWEEN,
        });
        return;
    }

    next();
};
