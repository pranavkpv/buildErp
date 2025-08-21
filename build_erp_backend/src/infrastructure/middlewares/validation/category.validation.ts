import { NextFunction, Request, Response } from "express";

export const validateCategoryAction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { brand_name, description } = req.body;

  if (!brand_name || typeof brand_name !== "string" || brand_name.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Category name (brand_name) is required and must be a non-empty string.",
    });
    return;
  }

  if (brand_name.trim().length < 2 || brand_name.trim().length > 50) {
    res.status(400).json({
      success: false,
      message: "Category name must be between 2 and 50 characters.",
    });
    return;
  }

  const validNameRegex = /^[a-zA-Z0-9\s\-_&]+$/;
  if (!validNameRegex.test(brand_name)) {
    res.status(400).json({
      success: false,
      message:
        "Category name contains invalid characters. Allowed: letters, numbers, spaces, -, _, &.",
    });
    return;
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      res.status(400).json({
        success: false,
        message: "Description must be a string if provided.",
      });
      return;
    }

    if (description.trim().length > 200) {
      res.status(400).json({
        success: false,
        message: "Description must not exceed 200 characters.",
      });
      return;
    }
  }

  next();
};
