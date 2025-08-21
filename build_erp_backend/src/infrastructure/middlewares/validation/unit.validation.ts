import { NextFunction, Request, Response } from "express";

export const validateUnitAction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { unit_name, short_name } = req.body;

  if (!unit_name || typeof unit_name !== "string" || unit_name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Unit name (unit_name) is required and must be a non-empty string.",
    });
    return;
  }

  if (unit_name.trim().length < 2 || unit_name.trim().length > 50) {
    res.status(400).json({
      success: false,
      message: "Unit name must be between 2 and 50 characters.",
    });
    return;
  }

  const validUnitRegex = /^[a-zA-Z0-9\s\-_&]+$/;
  if (!validUnitRegex.test(unit_name)) {
    res.status(400).json({
      success: false,
      message:
        "Unit name contains invalid characters. Allowed: letters, numbers, spaces, -, _, &.",
    });
    return;
  }

  if (!short_name || typeof short_name !== "string" || short_name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Short name (short_name) is required and must be a non-empty string.",
    });
    return;
  }

  if (short_name.trim().length < 1 || short_name.trim().length > 10) {
    res.status(400).json({
      success: false,
      message: "Short name must be between 1 and 10 characters.",
    });
    return;
  }

  const validShortRegex = /^[A-Z0-9]+$/;
  if (!validShortRegex.test(short_name)) {
    res.status(400).json({
      success: false,
      message:
        "Short name must be uppercase letters and numbers only (e.g., KG, MTR, PCS).",
    });
    return;
  }

  next();
};
