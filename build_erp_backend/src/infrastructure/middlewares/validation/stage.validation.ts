import { NextFunction, Request, Response } from "express";

export const validateStageAction = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { stages, projectId, startDate, endDate, cost } = req.body;
  if (!projectId || typeof projectId !== "string") {
    res.status(400).json({ message: "projectId is required and must be a string" });
    return;
  }

  if (!startDate || isNaN(Date.parse(startDate))) {
    res.status(400).json({ message: "Valid startDate is required" });
    return;
  }

  if (!endDate || isNaN(Date.parse(endDate))) {
    res.status(400).json({ message: "Valid endDate is required" });
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    res.status(400).json({ message: "startDate cannot be later than endDate" });
    return;
  }

  if (typeof cost !== "number" || cost <= 0) {
    res.status(400).json({ message: "cost must be a positive number" });
    return;
  }

  // Validate stages
  if (!stages || typeof stages !== "object") {
    res.status(400).json({ message: "stages object is required" });
    return;
  }

  const { stage_name, start_date, end_date, stage_percentage, stage_amount } = stages;

  if (!stage_name || typeof stage_name !== "string" || stage_name.trim() === "") {
    res.status(400).json({ message: "stage_name is required and must be a non-empty string" });
    return;
  }

  if (!start_date || isNaN(Date.parse(start_date))) {
    res.status(400).json({ message: "Valid stage start_date is required" });
    return;
  }

  if (!end_date || isNaN(Date.parse(end_date))) {
    res.status(400).json({ message: "Valid stage end_date is required" });
    return;
  }

  if (new Date(start_date) > new Date(end_date)) {
    res.status(400).json({ message: "stage start_date cannot be later than stage end_date" });
    return;
  }

  if (typeof stage_percentage !== "number" || stage_percentage <= 0 || stage_percentage > 100) {
    res.status(400).json({ message: "stage_percentage must be a number between 1 and 100" });
    return;
  }

  if (typeof stage_amount !== "number" || stage_amount <= 0) {
    res.status(400).json({ message: "stage_amount must be a positive number" });
    return;
  }

  const expectedAmount = (cost * stage_percentage) / 100;
  if (Math.abs(expectedAmount - stage_amount) > 1) { // allow minor float diff
    res.status(400).json({
      message: "stage_amount does not match stage_percentage of total cost"
    });
    return;
  }

  next();
};
