import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { StageFailedMessage } from '../../../Shared/Messages/Stage.Message';

export const validateStageAction = (req: Request,res: Response,next: NextFunction): void => {
    const { stages, projectId, startDate, endDate, cost } = req.body.data;
    if (!projectId) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: StageFailedMessage.PROJECT_ID_REQUIRED });
        return;
    }

    if (!startDate || isNaN(Date.parse(startDate))) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: StageFailedMessage.VALID_START_DATE });
        return;
    }

    if (!endDate || isNaN(Date.parse(endDate))) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: StageFailedMessage.VALID_END_DATE });
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: StageFailedMessage.START_DATE_LESS_THAN_END });
        return;
    }

    if (cost <= 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: StageFailedMessage.COST_POSITIVE });
        return;
    }

    // Validate stages
    if (!stages) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: StageFailedMessage.STAGE_CHAR });
        return;
    }

    let sumofStage = 0;

    for (const element of stages) {
        if (!element.stage_name || element.stage_name.trim() === '') {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: StageFailedMessage.STAGE_NAME_REQUIRED });
            return;
        }
        if (element.stage_name.length > 50) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: StageFailedMessage.STAGE_LENGTH });
            return;
        }

        if (!element.start_date) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: StageFailedMessage.STAGE_START_DATE_VALID });
            return;
        }

        if (!element.end_date) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: StageFailedMessage.STAGE_END_DATE_VALID });
            return;
        }

        if (new Date(element.start_date) > new Date(element.end_date)) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: StageFailedMessage.STAGE_START_GREATER_END_DATE });
            return;
        }

        if (typeof element.stage_percentage !== 'number' || element.stage_percentage <= 0 || element.stage_percentage > 100) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: StageFailedMessage.STAGE_PER_BETWEEN });
            return;
        }

        if (typeof element.stage_amount !== 'number' || element.stage_amount <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).
                json({ success: false, message: StageFailedMessage.STAGE_AMOUNT_POSITIVE });
            return;
        }

        const expectedAmount = (cost * element.stage_percentage) / 100;
        if (Math.abs(expectedAmount - element.stage_amount) > 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: StageFailedMessage.STAGE_AMOUNT_VALUE,
            });
            return;
        }
        sumofStage += element.stage_percentage;
    }
    if (sumofStage !== 100) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: StageFailedMessage.STAGE_AMOUNT_MATCH });
        return;
    }
    next();
};
