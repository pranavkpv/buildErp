import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { SpecFailedMessage } from '../../../Shared/Messages/Specification.Message';

//validate save estimation
export const validateSaveEstimation = (req: Request, res: Response, next: NextFunction): void => {
    const { projectId, row } = req.body;
    if (!projectId) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SpecFailedMessage.PROJECT_NAME_REQUIRED })
        return
    }
    if (!Array.isArray(row) || row.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SpecFailedMessage.SPEC_ID_MISS });
        return;
    }

    for (let i = 0; i < row.length; i++) {
        const item = row[i];

        if (!item.spec_id || item.spec_id.trim() == "") {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.SPEC_ID_CHAR });
            return;
        }

        if (!item.spec_name || item.spec_name.trim() == "") {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.SPEC_NAME_CHAR });
            return;
        }

        if (item.unitrate <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.UNIT_POSITIVE });
            return;
        }

        if (item.quantity <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.QUANTITY_POSITIVE });
            return;
        }

        if (item.total <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.TOTAL_POSITIVE });
            return;
        }
        if (item.total !== item.unitrate * item.quantity) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: SpecFailedMessage.TOTAL_VALUE,
            });
            return;
        }

    }
    next();
};

//validate upload estimation image
export const validateUploadEstimationImage = (req: Request, res: Response, next: NextFunction): void => {
    const file = req.files?.image;
    if (!file) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.IMAGE_REQUIRED });
        return;
    }
    if (Array.isArray(file)) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.ONLY_ONE });
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.INVALID_FILE });
        return;
    }
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.INVALID_FILE_SIZE });
        return;
    }
    next();
};