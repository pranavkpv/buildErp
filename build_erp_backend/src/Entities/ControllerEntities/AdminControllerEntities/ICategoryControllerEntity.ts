import { NextFunction, Request, Response } from "express"

export interface ICategoryControllerEntity {
   categoryList(req: Request, res: Response, next: NextFunction): Promise<void>
   addCategory(req: Request, res: Response, next: NextFunction): Promise<void>
   editCategory(req: Request, res: Response, next: NextFunction): Promise<void>
   deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void>
}