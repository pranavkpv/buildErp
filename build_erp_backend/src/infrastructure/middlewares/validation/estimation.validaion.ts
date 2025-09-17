import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { SpecFailedMessage } from '../../../Shared/Messages/Specification.Message';
import { ProjectFailedMessage } from '../../../Shared/Messages/Project.Message';
import { EstimationFailedMessage } from '../../../Shared/Messages/Estimation.Message';
import { bannerFailedMessage } from '../../../Shared/Messages/Banner.message';

//validate save estimation
export const validateSaveEstimation = (req: Request, res: Response, next: NextFunction): void => {
    const { projectId, row } = req.body;
    if (!projectId) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SpecFailedMessage.PROJECT_NAME_REQUIRED });
        return;
    }
    if (!Array.isArray(row) || row.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST)
            .json({ success: false, message: SpecFailedMessage.SPEC_ID_MISS });
        return;
    }

    for (let i = 0; i < row.length; i++) {
        const item = row[i];

        if (!item.spec_id || item.spec_id.trim() === '') {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.SPEC_ID_CHAR });
            return;
        }

        if (!item.spec_name || item.spec_name.trim() === '') {
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
    const projectId = req.params.id;
    const files = req.files as any
    const body = req.body;
    if (!projectId) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: ProjectFailedMessage.NOT_PROJECT,
        });
        return
    }
    for (let key in body) {
        if (body[key].trim() == "") {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: EstimationFailedMessage.NO_TITLE,
            });
            return
        }
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    for (let key in files) {
        if (!files[key]) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false, message: bannerFailedMessage.IMAGE_REQUIRED
            });
            return
        }
        if (!allowedTypes.includes(files[key].mimetype)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: bannerFailedMessage.ALLOWED_IMAGE,
            });
            return;
        }
    }
    next();
};