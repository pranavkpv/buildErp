import { NextFunction, Request, Response } from "express";

export const validateAddMaterial = (req: Request, res: Response, next: NextFunction): void => {
  const { material_name, category_id, brand_id, unit_id, unit_rate, stock, projectWiseStock } = req.body;

  if (!material_name || !category_id || !unit_id || unit_rate === undefined || stock === undefined) {
    res.status(400).json({ error: "material_name, category_id, unit_id, unit_rate and stock are required" });
    return;
  }

  if (typeof material_name !== "string" || material_name.trim().length === 0) {
    res.status(400).json({ error: "material_name must be a non-empty string" });
    return;
  }
  if (material_name.length > 100) {
    res.status(400).json({ error: "material_name should not exceed 100 characters" });
    return;
  }
  const validateId = (id: any, field: string) => {
    if (!id || (typeof id !== "string" && typeof id !== "number")) {
      res.status(400).json({ error: `${field} must be a valid string or number` });
      return false;
    }
    return true;
  };
  if (!validateId(category_id, "category_id")) return;
  if (brand_id && !validateId(brand_id, "brand_id")) return; // optional
  if (!validateId(unit_id, "unit_id")) return;

  if (typeof unit_rate !== "number" || isNaN(unit_rate)) {
    res.status(400).json({ error: "unit_rate must be a valid number" });
    return;
  }
  if (unit_rate <= 0) {
    res.status(400).json({ error: "unit_rate must be greater than 0" });
    return;
  }
  if (unit_rate > 1000000) {
    res.status(400).json({ error: "unit_rate too high, must be less than 1,000,000" });
    return;
  }

  if (typeof stock !== "number" || isNaN(stock)) {
    res.status(400).json({ error: "stock must be a valid number" });
    return;
  }
  if (stock < 0) {
    res.status(400).json({ error: "stock cannot be negative" });
    return;
  }

  if (projectWiseStock) {
    if (!Array.isArray(projectWiseStock)) {
      res.status(400).json({ error: "projectWiseStock must be an array" });
      return;
    }

    for (const [index, item] of projectWiseStock.entries()) {
      if (!item.project || (typeof item.project !== "string" && typeof item.project !== "number")) {
        res.status(400).json({ error: `projectWiseStock[${index}].project must be a valid string or number` });
        return;
      }
      if (typeof item.stock !== "number" || isNaN(item.stock) || item.stock < 0) {
        res.status(400).json({ error: `projectWiseStock[${index}].stock must be a valid non-negative number` });
        return;
      }
    }
  }

  next();
};
