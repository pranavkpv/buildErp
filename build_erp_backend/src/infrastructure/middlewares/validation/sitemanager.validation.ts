import { NextFunction, Request, Response } from "express";

export const validateStatusChange = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { stageId, newProgress, date } = req.body;

  // ===== Validate stageId =====
  if (!stageId || typeof stageId !== "string" || stageId.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "stageId is required and must be a valid non-empty string.",
    });
    return;
  }

  // Example: if stageId is expected to be MongoDB ObjectId
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(stageId)) {
    res.status(400).json({
      success: false,
      message: "Invalid stageId format. Must be a 24-character MongoDB ObjectId.",
    });
    return;
  }

  // ===== Validate newProgress =====
  if (
    newProgress === undefined ||
    newProgress === null ||
    isNaN(newProgress)
  ) {
    res.status(400).json({
      success: false,
      message: "newProgress is required and must be a number.",
    });
    return;
  }

  if (typeof newProgress !== "number") {
    res.status(400).json({
      success: false,
      message: "newProgress must be a number.",
    });
    return;
  }

  if (newProgress < 0 || newProgress > 100) {
    res.status(400).json({
      success: false,
      message: "newProgress must be between 0 and 100.",
    });
    return;
  }

  // ===== Validate date =====
  if (!date || typeof date !== "string" || date.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "date is required and must be a valid ISO date string.",
    });
    return;
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    res.status(400).json({
      success: false,
      message: "Invalid date format. Must be a valid date (ISO 8601 preferred).",
    });
    return;
  }

  // Optional: Prevent future dates
  const today = new Date();
  if (parsedDate > today) {
    res.status(400).json({
      success: false,
      message: "Date cannot be in the future.",
    });
    return;
  }

  next();
};



export const validateAddSitemanager = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { username, email } = req.body;

  // username validation
  if (!username || typeof username !== "string" || username.trim().length === 0) {
    res.status(400).json({ error: "Username is required and must be a non-empty string" });
    return;
  }
  if (username.length < 3) {
    res.status(400).json({ error: "Username must be at least 3 characters long" });
    return;
  }
  if (username.length > 30) {
    res.status(400).json({ error: "Username cannot exceed 30 characters" });
    return;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    res.status(400).json({ error: "Username can only contain letters, numbers, and underscores" });
    return;
  }

  // email validation
  if (!email || typeof email !== "string" || email.trim().length === 0) {
    res.status(400).json({ error: "Email is required and must be a non-empty string" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }
  if (email.length > 50) {
    res.status(400).json({ error: "Email cannot exceed 50 characters" });
    return;
  }

  next();
};

