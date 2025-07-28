import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../ModelEntities/ProjectEntity";

export interface IStageControllerEntity {
   fetchCost(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   stageSave(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   fetchStage(req: Request, res: Response, next: NextFunction): Promise<{data:IProjectModelEntity[],totalPage:number} | commonOutput>
   deleteStage(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   updateStage(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}