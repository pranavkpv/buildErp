import { NextFunction, Request, Response } from "express";

export const validateBrandAction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { brand_name } = req.body;

  if (!brand_name || typeof brand_name !== "string" || brand_name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Brand name is required and must be a non-empty string.",
    });
    return;
  }
  if (brand_name.trim().length < 2 || brand_name.trim().length > 50) {
    res.status(400).json({
      success: false,
      message: "Brand name must be between 2 and 50 characters long.",
    });
    return;
  }
  const validBrandRegex = /^[a-zA-Z0-9\s\-_&]+$/;
  if (!validBrandRegex.test(brand_name)) {
    res.status(400).json({
      success: false,
      message:
        "Brand name contains invalid characters. Allowed: letters, numbers, spaces, -, _, &.",
    });
    return;
  }

  next();
};
