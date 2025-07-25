import { NextFunction, Request, Response } from "express"

export interface IEstimationControllerEntity {
   SaveEstimation(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchEstimation(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteEstimation(req: Request, res: Response, next: NextFunction): Promise<void>
   uploadImage(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchExistEstimation(req: Request, res: Response, next: NextFunction): Promise<void>
   updateEstimation(req: Request, res: Response, next: NextFunction): Promise<void>
}