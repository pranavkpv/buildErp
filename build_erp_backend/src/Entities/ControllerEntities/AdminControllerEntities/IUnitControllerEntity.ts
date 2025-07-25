import { NextFunction, Request, Response } from "express"

export interface IUnitControllerEntity {
   getUnit(req: Request, res: Response, next: NextFunction): Promise<void>
   addUnit(req: Request, res: Response, next: NextFunction): Promise<void>
   editUnit(req: Request, res: Response, next: NextFunction): Promise<void>
   removeUnit(req: Request, res: Response, next: NextFunction): Promise<void>
   displayAllUnit(req: Request, res: Response, next: NextFunction): Promise<void>
}