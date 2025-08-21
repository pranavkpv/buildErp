import { Request, Response, NextFunction } from "express";

export const validateAddLabour = (req: Request, res: Response, next: NextFunction): void => {
  const { labour_type, daily_wage } = req.body;
  if (!labour_type || !daily_wage) {
    res.status(400).json({ error: "labour_type and daily_wage are required" });
    return;
  }
  if (typeof labour_type !== "string" || labour_type.trim().length === 0) {
    res.status(400).json({ error: "labour_type must be a non-empty string" });
    return;
  }
  if (labour_type.length > 50) {
    res.status(400).json({ error: "labour_type should not exceed 50 characters" });
    return;
  }
  if (typeof daily_wage !== "number" || isNaN(daily_wage)) {
    res.status(400).json({ error: "daily_wage must be a valid number" });
    return;
  }
  if (daily_wage <= 0) {
    res.status(400).json({ error: "daily_wage must be greater than 0" });
    return;
  }
  if (daily_wage > 100000) {
    res.status(400).json({ error: "daily_wage is too high, must be less than 100000" });
    return;
  }
  next();
};
