import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../../application/dto/CommonEntities/common";

export interface IGetUnitControllerEntity {
    getUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>;
}
