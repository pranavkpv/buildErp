import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IEditCategoryControllerEntity {
   editCategoryHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>
}