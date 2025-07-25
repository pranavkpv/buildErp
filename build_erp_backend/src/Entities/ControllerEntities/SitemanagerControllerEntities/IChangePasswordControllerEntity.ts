import { NextFunction, Request, Response } from "express"

export interface IchangePasswordControllerEntity {
   changedPassword(req: Request, res: Response, next: NextFunction): Promise<void>
}