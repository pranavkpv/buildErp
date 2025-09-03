import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { TransferFailedMessage } from '../../../Shared/Messages/Transfer.Message';
import { PurchaseFailedMessage } from '../../../Shared/Messages/Purchase.Message';
import { SpecFailedMessage } from '../../../Shared/Messages/Specification.Message';

export const validateTransfer = (req: Request, res: Response, next: NextFunction): void => {
    const { from_project_id, to_project_id, transfer_id, date, description, materialDetails } = req.body;
    if (!from_project_id || from_project_id.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: TransferFailedMessage.FROM_PROJECT_REQUIRED });
        return;
    }
    if (!to_project_id || to_project_id.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: TransferFailedMessage.TO_PROJECT_REQUIRED });
        return;
    }
    if (from_project_id === to_project_id) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: TransferFailedMessage.SAME_PROJECT_TRANSFER });
        return;
    }
    if (!transfer_id || transfer_id.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: TransferFailedMessage.TRANSFER_ID_REQUIRED });
        return;
    }
    if (transfer_id.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: TransferFailedMessage.TRANSFER_ID_MAX });
        return;
    }
    if (!date) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: PurchaseFailedMessage.DATE_REQUIRED });
        return;
    }
    if (new Date(date) > new Date()) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: PurchaseFailedMessage.DATE_FUTURE });
        return;
    }
    if (description.length > 100) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: PurchaseFailedMessage.DESCRIPTION_LENGTH });
        return;
    }
    if (materialDetails.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: PurchaseFailedMessage.DESCRIPTION_LENGTH });
        return;
    }
    for (const element of materialDetails) {
        if (!element.material_id) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: PurchaseFailedMessage.MATERIAL_REQUIRED });
            return;
        }
        if (element.quantity <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: SpecFailedMessage.MATERIAL_QTY_POSITIVE,
            });
            return;
        }
        if (element.unit_rate < 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: SpecFailedMessage.MATERIAL_RATE_POSITIVE,
            });
            return;
        }
    }
    next();
};