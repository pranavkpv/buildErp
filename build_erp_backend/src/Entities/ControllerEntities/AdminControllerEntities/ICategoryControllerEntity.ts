import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";

export interface ICategoryControllerEntity {
   categoryList(req: Request, res: Response, next: NextFunction): Promise<{getCategoryData:any[];totalPage:number } | commonOutput>
   addCategory(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   editCategory(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   deleteCategory(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
}