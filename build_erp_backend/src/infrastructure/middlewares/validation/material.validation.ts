import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { MaterialFailedMessage } from '../../../Shared/Messages/Material.Message';

export const validateAddMaterial = (req: Request, res: Response, next: NextFunction): void => {
    const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = req.body;

    if (!material_name || !category_id || !unit_id || unit_rate === undefined || stock === undefined) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: MaterialFailedMessage.REQUIRED_FIELD });
        return;
    }
    if (material_name.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: MaterialFailedMessage.MATERIAL_CHAR });
        return;
    }
    if (material_name.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: MaterialFailedMessage.MAX_MATERIAL_NAME });
        return;
    }
    const validateId = (id: string, field: string) => {
        if (!id || (typeof id !== 'string' && typeof id !== 'number')) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: `${ field } must be a valid string or number` });
            return false;
        }
        return true;
    };
    if (!validateId(category_id, 'category_id')) return;
    if (brand_id && !validateId(brand_id, 'brand_id')) return;
    if (!validateId(unit_id, 'unit_id')) return;

    if (typeof unit_rate !== 'number' || isNaN(unit_rate)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MaterialFailedMessage.UNIT_RATE_VALID });
        return;
    }
    if (unit_rate <= 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MaterialFailedMessage.UNIT_RATE_GREATER });
        return;
    }
    if (unit_rate > 1000000) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MaterialFailedMessage.UNIT_RATE_HIGH });
        return;
    }

    if (typeof stock !== 'number' || isNaN(stock)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: MaterialFailedMessage.STOCK_VALID });
        return;
    }
    if (stock < 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: MaterialFailedMessage.STOCK_NEGATIVE });
        return;
    }

    if (projectWiseStock) {
        if (!Array.isArray(projectWiseStock)) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: MaterialFailedMessage.PROJECT_WISE_STOCK_MUST });
            return;
        }
        let totalStock = 0;
        for (const element of projectWiseStock) {
            if (!element.project) {
                res.status(HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: MaterialFailedMessage.PROJECT_REQUIRED });
                return;
            }
            if (element.stock === undefined) {
                res.status(HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: MaterialFailedMessage.PROJECT_WISE_STOCK_REQUIRED });
                return;
            }
            if (element.stock <= 0) {
                res.status(HTTP_STATUS.BAD_REQUEST)
                    .json({ success: false, message: MaterialFailedMessage.PROJECT_WISE_STOCK_POSITIVE });
                return;
            }
            totalStock += element.stock;
        }
        if (totalStock !== stock) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success:false,message:MaterialFailedMessage.STOCK_NOT_MATCH });
            return;
        }
    }

    next();
};
