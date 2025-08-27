import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { brandFailedMessage } from "../../../Shared/Messages/Brand.Message";

export const validateBrandAction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { brand_name } = req.body;

  if (!brand_name || typeof brand_name !== "string" || brand_name.trim().length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: brandFailedMessage.REQUIRED_FIELD,
    });
    return;
  }
  if (brand_name.trim().length < 2 || brand_name.trim().length > 50) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: brandFailedMessage.BRAND_LENGTH,
    });
    return;
  }
  const validBrandRegex = /^[a-zA-Z0-9\s\-_&]+$/;
  if (!validBrandRegex.test(brand_name)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message:brandFailedMessage.EXIST_CHAR,
    });
    return;
  }

  next();
};
