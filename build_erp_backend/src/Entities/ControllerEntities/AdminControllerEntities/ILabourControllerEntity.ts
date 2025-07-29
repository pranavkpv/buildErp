import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { ILabourModelEntity } from "../../ModelEntities/Labour.Entity";
import { labourOutput } from "../../Input-OutputEntities/LabourEntities/labour";

export interface ILabourControllerEntity {
   getLabour(req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput>
   saveLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   removeLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   updateLabour(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchlabour(req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput>
   getLabourBYId(req: Request, res: Response, next: NextFunction): Promise<labourOutput | commonOutput>
}