import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { SpecFailedMessage } from '../../../Shared/Messages/Specification.Message';

export const validateSaveEstimation = (req: Request, res: Response, next: NextFunction): void => {
    const { projectId, row } = req.body;
    if (!Array.isArray(row) || row.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success:false, message: SpecFailedMessage.SPEC_ID_MISS });
        return;
    }

    for (let i = 0; i < row.length; i++) {
        const item = row[i];

        if (!item.spec_id || typeof item.spec_id !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success:false, message: SpecFailedMessage.SPEC_ID_CHAR });
            return;
        }

        if (!item.spec_name || typeof item.spec_name !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success:false, message: SpecFailedMessage.SPEC_NAME_CHAR });
            return;
        }

        if (typeof item.unitrate !== 'number' || item.unitrate <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success:false, message: SpecFailedMessage.UNIT_POSITIVE });
            return;
        }

        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success:false, message: SpecFailedMessage.QUANTITY_POSITIVE });
            return;
        }

        if (typeof item.total !== 'number' || item.total <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success:false, message: SpecFailedMessage.TOTAL_POSITIVE });
            return;
        }
        if (item.total !== item.unitrate * item.quantity) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message: SpecFailedMessage.TOTAL_VALUE,
            });
            return;
        }

    }
    next();
};

export const validateUploadEstimationImage = (req: Request, res: Response, next: NextFunction): void =>{
    const file = req.files?.image;
    if (!file) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success:false,message: SpecFailedMessage.IMAGE_REQUIRED });
        return;
    }
    if (Array.isArray(file)) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success:false,message: SpecFailedMessage.ONLY_ONE });
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success:false,message: SpecFailedMessage.INVALID_FILE });
        return;
    }
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success:false,message: SpecFailedMessage.INVALID_FILE_SIZE });
        return;
    }
    next();
};