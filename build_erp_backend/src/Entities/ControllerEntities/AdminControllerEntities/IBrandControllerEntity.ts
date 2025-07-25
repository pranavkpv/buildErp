import { NextFunction, Request, Response } from "express"

export interface IBrandControllerEntity {
   brandList(req: Request, res: Response, next: NextFunction): Promise<void>
   addBrand(req: Request, res: Response, next: NextFunction): Promise<void>
   editBrand(req: Request, res: Response, next: NextFunction): Promise<void>
   removeBrand(req: Request, res: Response, next: NextFunction): Promise<void>
}