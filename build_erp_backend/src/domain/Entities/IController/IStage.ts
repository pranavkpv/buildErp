import { Request, Response, NextFunction } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { stageListDTO } from '../../../application/dto/stage.dto';


export interface IStageController {

   fetchProjectCost(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void>

   saveStage(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAllStages(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: stageListDTO[]; totalPage: number }> | commonOutput | void>

   removeStage(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateStage(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   paymentIntendCreation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<string>| commonOutput | void>

   handleWebhook(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

}