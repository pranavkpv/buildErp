import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { CategoryFailedMessage } from '../../../Shared/Messages/Category.Message';

export const validateCategoryAction = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const { category_name, description } = req.body;

    if (!category_name || typeof category_name !== 'string' || category_name.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: CategoryFailedMessage.NEED_CATEGORY,
        });
        return;
    }

    if (category_name.trim().length < 2 || category_name.trim().length > 50) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: CategoryFailedMessage.CATEGORY_LENGTH,
        });
        return;
    }

    const validNameRegex = /^[a-zA-Z0-9\s\-_&]+$/;
    if (!validNameRegex.test(category_name)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message:CategoryFailedMessage.EXIST_SPECIAL_CHAR,
        });
        return;
    }

    if (description !== undefined) {
        if (typeof description !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message:CategoryFailedMessage.DESCRIPTION_CHAR,
            });
            return;
        }

        if (description.trim().length > 200) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: CategoryFailedMessage.DESCRIPTION_LENGTH,
            });
            return;
        }
    }

    next();
};
