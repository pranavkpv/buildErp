import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../application/dto/common"
import { publicstageDTO } from "../../../application/dto/stage.dto"


export interface IstatusController {

   updateStageStatus(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void>

   uploadStageImages(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput | void> 

   getStageByProjectId(req: Request, res: Response, next: NextFunction): 
   Promise<commonOutput<publicstageDTO[]> | void>
   
}