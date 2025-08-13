import { Request, Response, NextFunction } from "express";
import { commonOutput } from "../../../DTO/CommonEntities/common";
import { UnitOutput } from "../../../DTO/MaterialEntities/unit";

export interface IDisplayAllUnitControllerEntity {
    displayAllUnitHandler(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void>;
}
