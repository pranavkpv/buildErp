import { Request, Response, NextFunction } from "express";

export interface IStageControllerEntity {
   fetchCost(req: Request, res: Response, next: NextFunction): Promise<void>
   stageSave(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchStage(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteStage(req: Request, res: Response, next: NextFunction): Promise<void>
   updateStage(req: Request, res: Response, next: NextFunction): Promise<void>
}