import { Request, Response, NextFunction } from "express";

export interface IstatusControllerEntity {
   fetchStageData(req: Request, res: Response, next: NextFunction): Promise<void>
   changeStatus(req: Request, res: Response, next: NextFunction): Promise<void>
   uploadImage(req: Request, res: Response, next: NextFunction): Promise<void>
}