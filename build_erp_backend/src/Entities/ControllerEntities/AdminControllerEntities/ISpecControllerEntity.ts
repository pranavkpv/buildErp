import { NextFunction, Request, Response } from "express"

export interface ISpecControllerEntity {
   getSpeclist(req: Request, res: Response, next: NextFunction): Promise<void>
   saveSpec(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchlabourMaterial(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteSpec(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchSpec(req: Request, res: Response, next: NextFunction): Promise<void>
   findMaterialSum(req: Request, res: Response, next: NextFunction): Promise<void>
   findLaboursum(req: Request, res: Response, next: NextFunction): Promise<void>
   updateSpec(req: Request, res: Response, next: NextFunction): Promise<void>
}