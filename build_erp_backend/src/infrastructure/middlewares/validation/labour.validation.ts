import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { LabourFailedMessage } from "../../../Shared/Messages/Labour.Message";

export const validateAddLabour = (req: Request, res: Response, next: NextFunction): void => {
  const { labour_type, daily_wage } = req.body;
  if (!labour_type || !daily_wage) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message: LabourFailedMessage.REQUIRED_FIELD });
    return;
  }
  if (typeof labour_type !== "string" || labour_type.trim().length === 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message: LabourFailedMessage.LABOUR_TYPE_CHAR });
    return;
  }
  if (labour_type.length > 50) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message: LabourFailedMessage.LABOUR_TYPE_SIZE });
    return;
  }
  if (typeof daily_wage !== "number" || isNaN(daily_wage)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message: LabourFailedMessage.DAILYWAGE_CHAR });
    return;
  }
  if (daily_wage <= 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message: LabourFailedMessage.DAILYWAGE_GREATER_ZERO });
    return;
  }
  if (daily_wage > 100000) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,message: LabourFailedMessage.DAILY_WAGE_MAX });
    return;
  }
  next();
};
