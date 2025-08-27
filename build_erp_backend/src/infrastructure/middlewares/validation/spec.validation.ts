import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { SpecFailedMessage } from "../../../Shared/Messages/Specification.Message";

/**
 * Middleware to validate specification creation/updation request body
 */
export const validateSpecification = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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
  if (!specId || typeof specId !== "string" || specId.trim().length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: SpecFailedMessage.SPEC_ID_REQUIRED,
    });
    return;
  }

  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(specId)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: SpecFailedMessage.SPEC_ID_FORMAT,
    });
    return;
  }

  // ===== Validate specname =====
  if (!specname || typeof specname !== "string" || specname.trim().length < 3) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: SpecFailedMessage.SPEC_NAME_MIN,
    });
    return;
  }

  // ===== Validate specUnit =====
  if (!specUnit || typeof specUnit !== "string") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: SpecFailedMessage.SPEC_UNIT_REQUIRED,
    });
    return;
  }

  // ===== Validate specDescription (optional) =====
  if (specDescription && typeof specDescription !== "string") {
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
  for (let i = 0; i < materialDetails.length; i++) {
    const item = materialDetails[i];
    if (!item.materialId || typeof item.materialId !== "string") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: SpecFailedMessage.MATERIAL_ID_FORMAT,
      });
      return;
    }
    if (typeof item.qty !== "number" || item.qty <= 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: SpecFailedMessage.MATERIAL_QTY_POSITIVE,
      });
      return;
    }
    if (typeof item.rate !== "number" || item.rate < 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: SpecFailedMessage.MATERIAL_RATE_POSITIVE,
      });
      return;
    }
  }

  // ===== Validate labourDetails =====
  if (!Array.isArray(labourDetails) || labourDetails.length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: SpecFailedMessage.LABOUR_REQUIRED,
    });
    return;
  }
  for (let i = 0; i < labourDetails.length; i++) {
    const item = labourDetails[i];
    if (!item.labourId || typeof item.labourId !== "string") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: SpecFailedMessage.LABOUR_ID_FORMAT,
      });
      return;
    }
    if (typeof item.hours !== "number" || item.hours <= 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: SpecFailedMessage.LABOUR_HOURS_POSITIVE,
      });
      return;
    }
    if (typeof item.rate !== "number" || item.rate < 0) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: SpecFailedMessage.LABOUR_RATE_POSITIVE,
      });
      return;
    }
  }

  // ===== Validate additionalExpensePer =====
  if (
    typeof additionalExpensePer !== "number" ||
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
  if (typeof profitPer !== "number" || profitPer < 0 || profitPer > 100) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: SpecFailedMessage.PROFIT_RANGE,
    });
    return;
  }

  next();
};
