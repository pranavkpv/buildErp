import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IAdminControllerEntity {
   login(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   logout(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
}