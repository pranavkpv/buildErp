import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../Shared/statusCodes/statusCodes";
import { StageFailedMessage } from "../../../Shared/Messages/Stage.Message";

export const validateStageAction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { stages, projectId, startDate, endDate, cost } = req.body;
  if (!projectId || typeof projectId !== "string") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.PROJECT_ID_REQUIRED });
    return;
  }

  if (!startDate || isNaN(Date.parse(startDate))) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.VALID_START_DATE });
    return;
  }

  if (!endDate || isNaN(Date.parse(endDate))) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.VALID_END_DATE });
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.START_DATE_LESS_THAN_END });
    return;
  }

  if (typeof cost !== "number" || cost <= 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.COST_POSITIVE});
    return;
  }

  // Validate stages
  if (!stages || typeof stages !== "object") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_CHAR });
    return;
  }

  const { stage_name, start_date, end_date, stage_percentage, stage_amount } = stages;

  if (!stage_name || typeof stage_name !== "string" || stage_name.trim() === "") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_NAME_REQUIRED });
    return;
  }

  if (!start_date || isNaN(Date.parse(start_date))) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_START_DATE_VALID });
    return;
  }

  if (!end_date || isNaN(Date.parse(end_date))) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_END_DATE_VALID });
    return;
  }

  if (new Date(start_date) > new Date(end_date)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_START_GREATER_END_DATE});
    return;
  }

  if (typeof stage_percentage !== "number" || stage_percentage <= 0 || stage_percentage > 100) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_PER_BETWEEN});
    return;
  }

  if (typeof stage_amount !== "number" || stage_amount <= 0) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false, message: StageFailedMessage.STAGE_AMOUNT_POSITIVE });
    return;
  }

  const expectedAmount = (cost * stage_percentage) / 100;
  if (Math.abs(expectedAmount - stage_amount) > 1) { 
    res.status(HTTP_STATUS.BAD_REQUEST).json({success:false,
      message: StageFailedMessage.STAGE_AMOUNT_VALUE
    });
    return;
  }

  next();
};
