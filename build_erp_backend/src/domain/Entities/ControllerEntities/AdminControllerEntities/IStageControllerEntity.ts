import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../../application/dto/CommonEntities/common";
import { projectOutput } from "../../../../application/dto/ProjectEntities/project";

export interface IStageControllerEntity {
   fetchCost(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   stageSave(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   fetchStage(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
   deleteStage(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   updateStage(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}