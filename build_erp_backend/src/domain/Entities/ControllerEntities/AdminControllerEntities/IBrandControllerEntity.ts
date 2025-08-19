import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/CommonEntities/common";


export interface IBrandControllerEntity {
   brandList(req: Request, res: Response, next: NextFunction):Promise<commonOutput | void>
   addBrand(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
   editBrand(req: Request, res: Response, next: NextFunction):  Promise<commonOutput | void>
   removeBrand(req: Request, res: Response, next: NextFunction):  Promise<commonOutput | void>
}