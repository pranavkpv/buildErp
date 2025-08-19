import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/common";

export interface ILabourController {
   saveLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getLabour(req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput>
   
   removeLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   updateLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchlabour(req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput>
   getLabourBYId(req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput>
}