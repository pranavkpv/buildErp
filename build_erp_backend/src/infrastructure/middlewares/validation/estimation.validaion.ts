import { NextFunction, Request, Response } from "express";

export const validateSaveEstimation = (req: Request, res: Response, next: NextFunction): void => {
   const { projectId, row } = req.body
   if (!Array.isArray(row) || row.length === 0) {
      res.status(400).json({ error: "Row must be a non-empty array." });
      return;
   }

   for (let i = 0; i < row.length; i++) {
      const item = row[i];

      if (!item.spec_id || typeof item.spec_id !== "string") {
         res.status(400).json({ error: `Row[${ i }]: spec_id must be a non-empty string.` });
         return;
      }

      if (!item.spec_name || typeof item.spec_name !== "string") {
         res.status(400).json({ error: `Row[${ i }]: spec_name must be a non-empty string.` });
         return;
      }

      if (typeof item.unitrate !== "number" || item.unitrate <= 0) {
         res.status(400).json({ error: `Row[${ i }]: unitrate must be a positive number.` });
         return;
      }

      if (typeof item.quantity !== "number" || item.quantity <= 0) {
         res.status(400).json({ error: `Row[${ i }]: quantity must be a positive number.` });
         return;
      }

      if (typeof item.total !== "number" || item.total <= 0) {
         res.status(400).json({ error: `Row[${ i }]: total must be a positive number.` });
         return;
      }
      if (item.total !== item.unitrate * item.quantity) {
         res.status(400).json({
            error: `Row[${ i }]: total must equal unitrate * quantity.`,
         });
         return;
      }

   }
   next()
}

export const validateUploadEstimationImage = (req: Request, res: Response, next: NextFunction): void =>{
    const file = req.files?.image;
    if (!file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }
    if (Array.isArray(file)) {
      res.status(400).json({ message: "Only one image is allowed" });
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      res.status(400).json({ message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed." });
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      res.status(400).json({ message: "File too large. Max 5MB allowed." });
      return;
    }
    next();
}