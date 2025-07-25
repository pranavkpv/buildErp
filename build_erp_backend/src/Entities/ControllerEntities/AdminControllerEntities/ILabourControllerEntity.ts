import { NextFunction, Request, Response } from "express"

export interface ILabourControllerEntity {
   getLabour(req: Request, res: Response, next: NextFunction): Promise<void>
   saveLabour(req: Request, res: Response, next: NextFunction): Promise<void>
   removeLabour(req: Request, res: Response, next: NextFunction): Promise<void>
   updateLabour(req: Request, res: Response, next: NextFunction): Promise<void>
   fetchlabour(req: Request, res: Response, next: NextFunction): Promise<void>
   getLabourBYId(req: Request, res: Response, next: NextFunction): Promise<void>
}