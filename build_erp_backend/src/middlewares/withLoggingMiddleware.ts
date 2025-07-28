import { Request, Response, NextFunction } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function withLogging(handler: AsyncHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
        res.locals.result = result;
        res.status(result.status_code).json(result);
      
    } catch (err) {
      next(err);
    }
  };
}
