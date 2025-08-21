import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/common";


export interface IDeleteCategoryController {
   deleteCategoryHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}