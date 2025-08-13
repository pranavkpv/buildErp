import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IstatusControllerEntity {
   fetchStageData(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   changeStatus(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   uploadImage(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
}