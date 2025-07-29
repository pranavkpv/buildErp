import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common"
import { EstimationData, estimationOutput, SpecData } from "../../Input-OutputEntities/EstimationEntities/estimation"

export interface IEstimationControllerEntity {
   SaveEstimation(req: Request, res: Response, next: NextFunction): Promise<commonOutput> 
   fetchEstimation(req: Request, res: Response, next: NextFunction): Promise<estimationOutput | commonOutput>
   deleteEstimation(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   uploadImage(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
   fetchExistEstimation(req: Request, res: Response, next: NextFunction): Promise <estimationOutput | commonOutput>
   updateEstimation(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}