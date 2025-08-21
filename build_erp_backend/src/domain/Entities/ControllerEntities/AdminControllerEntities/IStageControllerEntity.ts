import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../../application/dto/common";


export interface IStageController {
   fetchCost(req: Request, res: Response, next: NextFunction):Promise<commonOutput<number> | commonOutput> 
   stageSave(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   fetchStage(req: Request, res: Response, next: NextFunction): Promise<projectOutput | commonOutput>
   deleteStage(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   updateStage(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}