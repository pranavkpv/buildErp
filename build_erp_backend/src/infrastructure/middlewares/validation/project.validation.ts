import { NextFunction, Request, Response } from "express";

export const validateProjectAdd = (req: Request, res: Response, next: NextFunction): void => {
   const { project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = req.body;
   if (!project_name || !user_id || !address || !mobile_number || !email) {
      res.status(400).json({ error: "project_name, user_id, address, mobile_number, and email are required" });
      return;
   }
   if (typeof project_name !== "string" || project_name.trim().length === 0) {
      res.status(400).json({ error: "project_name must be a non-empty string" });
      return;
   }
   if (project_name.length > 100) {
      res.status(400).json({ error: "project_name should not exceed 100 characters" });
      return;
   }
   if (typeof user_id !== "string" && typeof user_id !== "number") {
      res.status(400).json({ error: "user_id must be a valid string or number" });
      return;
   }

   if (typeof address !== "string" || address.trim().length === 0) {
      res.status(400).json({ error: "address must be a non-empty string" });
      return;
   }
   if (address.length > 200) {
      res.status(400).json({ error: "address should not exceed 200 characters" });
      return;
   }
   if (typeof mobile_number !== "string" && typeof mobile_number !== "number") {
      res.status(400).json({ error: "mobile_number must be a string or number" });
      return;
   }
   const mobileStr = String(mobile_number);
   if (!/^\d{10,15}$/.test(mobileStr)) {
      res.status(400).json({ error: "mobile_number must be 10–15 digits" });
      return;
   }
   if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "email must be a valid email address" });
      return;
   }

   if (area !== undefined && typeof area !== "string" && typeof area !== "number") {
      res.status(400).json({ error: "area must be a string or number if provided" });
      return;
   }
   if (description !== undefined) {
      if (typeof description !== "string") {
         res.status(400).json({ error: "description must be a string" });
         return;
      }
      if (description.length > 500) {
         res.status(400).json({ error: "description should not exceed 500 characters" });
         return;
      }
   }
   if (latitude !== undefined) {
      if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
         res.status(400).json({ error: "latitude must be a number between -90 and 90" });
         return;
      }
   }

   if (longitude !== undefined) {
      if (typeof longitude !== "number" || longitude < -180 || longitude > 180) {
         res.status(400).json({ error: "longitude must be a number between -180 and 180" });
         return;
      }
   }
   next();
};
