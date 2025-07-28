import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { IUnitModelEntity } from "../../ModelEntities/Unit.Entity";

export interface IUnitControllerEntity {
   getUnit(req: Request, res: Response, next: NextFunction): Promise<{getUnitData:any[];totalPage:number } | commonOutput>
   addUnit(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   editUnit(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeUnit(req: Request, res: Response, next: NextFunction):Promise<commonOutput>
   displayAllUnit(req: Request, res: Response, next: NextFunction): Promise<IUnitModelEntity[] | [] | commonOutput>
}