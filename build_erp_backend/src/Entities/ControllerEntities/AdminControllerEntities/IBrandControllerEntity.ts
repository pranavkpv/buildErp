import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";

export interface IBrandControllerEntity {
   brandList(req: Request, res: Response, next: NextFunction):Promise<{getBrandData:any[];totalPage:number } | commonOutput>
   addBrand(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   editBrand(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   removeBrand(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
}