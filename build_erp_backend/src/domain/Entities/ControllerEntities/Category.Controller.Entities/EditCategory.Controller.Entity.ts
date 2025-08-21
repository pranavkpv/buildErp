import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/common";

export interface IEditCategoryController {
   editCategoryHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput >
}