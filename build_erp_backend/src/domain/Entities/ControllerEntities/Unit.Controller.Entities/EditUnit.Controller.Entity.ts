import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../../application/dto/CommonEntities/common";

export interface IEditUnitControllerEntity {
    editUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>;
}
