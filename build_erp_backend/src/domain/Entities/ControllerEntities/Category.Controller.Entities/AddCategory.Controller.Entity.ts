import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/common";


export interface IAddCategoryController {
   addCategoryHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
}