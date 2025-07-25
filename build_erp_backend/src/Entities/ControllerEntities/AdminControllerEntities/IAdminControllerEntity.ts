import { NextFunction, Request, Response } from "express";

export interface IAdminControllerEntity {
   login(req: Request, res: Response, next: NextFunction): Promise<void>
   logout(req: Request, res: Response, next: NextFunction): Promise<void>
}