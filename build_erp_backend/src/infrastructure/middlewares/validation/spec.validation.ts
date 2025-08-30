import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../../Shared/statusCodes/statusCodes';
import { SpecFailedMessage } from '../../../Shared/Messages/Specification.Message';

/**
 * Middleware to validate specification creation/updation request body
 */
export const validateSpecification = (req: Request, res: Response, next: NextFunction,): void => {
    const {
        specId,
        specname,
        specUnit,
        specDescription,
        materialDetails,
        labourDetails,
        additionalExpensePer,
        profitPer,
    } = req.body;
    // ===== Validate specId =====
    if (!specId || typeof specId !== 'string' || specId.trim().length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.SPEC_ID_REQUIRED,
        });
        return;
    }


    // ===== Validate specname =====
    if (!specname || typeof specname !== 'string' || specname.trim().length < 3) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.SPEC_NAME_MIN,
        });
        return;
    }

    if (specname.length > 20) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.MAX_SPEC_NAME })
        return
    }

    // ===== Validate specUnit =====
    if (!specUnit || typeof specUnit !== 'string') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.SPEC_UNIT_REQUIRED,
        });
        return;
    }

    // ===== Validate specDescription (optional) =====
    if (specDescription && typeof specDescription !== 'string') {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.SPEC_DESCRIPTION_FORMAT,
        });
        return;
    }

    // ===== Validate materialDetails =====
    if (!Array.isArray(materialDetails) || materialDetails.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.MATERIAL_REQUIRED,
        });
        return;
    }
    let existMaterial: string[] = []
    for (let i = 0; i < materialDetails.length; i++) {
        const item = materialDetails[i];
        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: SpecFailedMessage.MATERIAL_QTY_POSITIVE,
            });
            return;
        }
        if (!item.material_id) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.MATERIAL_NAME_REQUIRED })
            return
        }
        if (!existMaterial.includes(item.material_id)) {
            existMaterial.push(item.material_id)
        }
    }
    if (existMaterial.length !== materialDetails.length) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.MATERIAL_UNIQUE })
        return
    }

    // ===== Validate labourDetails =====
    if (!Array.isArray(labourDetails) || labourDetails.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.LABOUR_REQUIRED,
        });
        return;
    }
    let existLabour: string[] = []
    for (let i = 0; i < labourDetails.length; i++) {
        const item = labourDetails[i];
        if (typeof item.numberoflabour !== 'number' || item.numberoflabour <= 0) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: SpecFailedMessage.LABOUR_HOURS_POSITIVE,
            });
            return;
        }
        if (!item.labour_id) {
            res.status(HTTP_STATUS.BAD_REQUEST)
                .json({ success: false, message: SpecFailedMessage.LABOUR_NAME_REQUIRED })
            return
        }
        if (!existLabour.includes(item.labour_id)) {
            existLabour.push(item.labour_id)
        }
    }

    if (existLabour.length !== labourDetails.length) {
        res.status(HTTP_STATUS.BAD_REQUEST).
            json({ success: false, message: SpecFailedMessage.LABOUR_UNIQUE })
        return
    }

    // ===== Validate additionalExpensePer =====
    if (
        typeof additionalExpensePer !== 'number' ||
        additionalExpensePer < 0 ||
        additionalExpensePer > 100
    ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.ADDITIONAL_EXPENSE_RANGE,
        });
        return;
    }

    // ===== Validate profitPer =====
    if (typeof profitPer !== 'number' || profitPer < 0 || profitPer > 100) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: SpecFailedMessage.PROFIT_RANGE,
        });
        return;
    }

    next();
};


