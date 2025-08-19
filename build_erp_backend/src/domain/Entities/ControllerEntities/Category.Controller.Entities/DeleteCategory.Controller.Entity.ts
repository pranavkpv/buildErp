import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/CommonEntities/common";

export interface IDeleteCategoryControllerEntity {
   deleteCategoryHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
}