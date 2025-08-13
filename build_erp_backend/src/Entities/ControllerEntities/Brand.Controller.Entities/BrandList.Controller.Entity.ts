import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IBrandListControllerEntity {
    brandListHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>;
}
