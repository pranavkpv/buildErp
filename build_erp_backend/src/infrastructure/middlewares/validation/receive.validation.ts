import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { PurchaseFailedMessage } from '../../../Shared/Messages/Purchase.Message';
import { ReceiveFailedMessage } from '../../../Shared/Messages/Receive.Message';

export const receiveValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { project_id, date, description, materialDetails, transferId } = req.body;
    if (!project_id || project_id.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: PurchaseFailedMessage.PROJECT_REQUIRED });
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
    if (transferId.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message:ReceiveFailedMessage.SELECT_ATLEAST_ONE });
        return;
    }
    if (materialDetails.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: PurchaseFailedMessage.DESCRIPTION_LENGTH });
        return;
    }
    next();
};
