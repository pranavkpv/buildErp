import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../application/dto/common"


export interface IstatusController {

   updateStageStatus(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void>

   uploadStageImages(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> 
   
}