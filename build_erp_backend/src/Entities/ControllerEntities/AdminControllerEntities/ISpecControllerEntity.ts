import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../DTO/CommonEntities/common"
import { specOutput } from "../../../DTO/EstimationEntities/specification"

export interface ISpecControllerEntity {
   getSpeclist(req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput>
   saveSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchlabourMaterial(req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput>
   deleteSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchSpec(req: Request, res: Response, next: NextFunction):Promise<specOutput | commonOutput>
   findMaterialSum(req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput>
   findLaboursum(req: Request, res: Response, next: NextFunction): Promise<specOutput | commonOutput>
   updateSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}