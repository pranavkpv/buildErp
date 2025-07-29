import { Request, Response, NextFunction } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function withLogging(handler: AsyncHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
        res.locals.message = result.message;
        res.locals.status_code = result.status_code
        res.status(result.status_code).json(result);  
    } catch (err) {
      next(err);
    }
  };
}
