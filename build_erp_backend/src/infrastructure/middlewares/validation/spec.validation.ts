import { NextFunction, Request, Response } from "express";

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

  const errors: string[] = [];

  if (!specId || typeof specId !== "string" || specId.trim().length === 0) {
    errors.push("specId is required and must be a non-empty string");
  }

  if (!specname || typeof specname !== "string" || specname.trim().length < 3) {
    errors.push("specname is required and must be at least 3 characters");
  }

  if (!specUnit || typeof specUnit !== "string") {
    errors.push("specUnit is required and must be a string");
  }

  if (specDescription && typeof specDescription !== "string") {
    errors.push("specDescription must be a string");
  }

  if (!Array.isArray(materialDetails) || materialDetails.length === 0) {
    errors.push("materialDetails is required and must be a non-empty array");
  } else {
    materialDetails.forEach((item: any, index: number) => {
      if (!item.materialId || typeof item.materialId !== "string") {
        errors.push(`materialDetails[${index}].materialId must be a string`);
      }
      if (typeof item.qty !== "number" || item.qty <= 0) {
        errors.push(`materialDetails[${index}].qty must be a positive number`);
      }
      if (typeof item.rate !== "number" || item.rate < 0) {
        errors.push(`materialDetails[${index}].rate must be a non-negative number`);
      }
    });
  }

  if (!Array.isArray(labourDetails) || labourDetails.length === 0) {
    errors.push("labourDetails is required and must be a non-empty array");
  } else {
    labourDetails.forEach((item: any, index: number) => {
      if (!item.labourId || typeof item.labourId !== "string") {
        errors.push(`labourDetails[${index}].labourId must be a string`);
      }
      if (typeof item.hours !== "number" || item.hours <= 0) {
        errors.push(`labourDetails[${index}].hours must be a positive number`);
      }
      if (typeof item.rate !== "number" || item.rate < 0) {
        errors.push(`labourDetails[${index}].rate must be a non-negative number`);
      }
    });
  }


  if (
    typeof additionalExpensePer !== "number" ||
    additionalExpensePer < 0 ||
    additionalExpensePer > 100
  ) {
    errors.push("additionalExpensePer must be a number between 0 and 100");
  }

  if (
    typeof profitPer !== "number" ||
    profitPer < 0 ||
    profitPer > 100
  ) {
    errors.push("profitPer must be a number between 0 and 100");
  }

  if (errors.length > 0) {
    res.status(400).json({ success: false, errors });
    return;
  }

  next();
};
