import { NextFunction } from "express-serve-static-core";
import { commonOutput } from "../../../DTO/CommonEntities/common";
import { Request, Response } from "express";

export interface IRefreshTokenControllerEntity {
   handleRefreshToken(req: Request, res: Response, next: NextFunction):Promise<commonOutput | void>
}