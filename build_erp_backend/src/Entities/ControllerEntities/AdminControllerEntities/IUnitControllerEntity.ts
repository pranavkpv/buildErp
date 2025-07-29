import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { UnitOutput } from "../../Input-OutputEntities/MaterialEntities/unit";

export interface IUnitControllerEntity {
   getUnit(req: Request, res: Response, next: NextFunction): Promise<UnitOutput | commonOutput>
   addUnit(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editUnit(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeUnit(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   displayAllUnit(req: Request, res: Response, next: NextFunction): Promise<UnitOutput | [] | commonOutput>
}