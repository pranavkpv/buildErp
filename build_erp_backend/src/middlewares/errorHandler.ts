import { Request, Response, NextFunction } from "express";
import { ResponseHelper } from "../Shared/ResponseHelper/response";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = ResponseHelper.default(err); 
  res.status(response.status_code).json(response);
};
