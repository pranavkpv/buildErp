import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { ILabourModelEntity } from "../../ModelEntities/Labour.Entity";

export interface ILabourControllerEntity {
   getLabour(req: Request, res: Response, next: NextFunction): Promise<{getLabourData:any[];totalPage:number } | commonOutput>
   saveLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   updateLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchlabour(req: Request, res: Response, next: NextFunction): Promise<ILabourModelEntity[] | []| commonOutput>
   getLabourBYId(req: Request, res: Response, next: NextFunction): Promise<ILabourModelEntity | null | commonOutput>
}