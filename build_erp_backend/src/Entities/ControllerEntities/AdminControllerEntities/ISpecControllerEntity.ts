import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common"
import { ISpecModelEntity } from "../../ModelEntities/Spec.Entity"

export interface ISpecControllerEntity {
   getSpeclist(req: Request, res: Response, next: NextFunction): Promise<{result:any[],totalPage:number} | commonOutput>
   saveSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchlabourMaterial(req: Request, res: Response, next: NextFunction): Promise<number | commonOutput>
   deleteSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchSpec(req: Request, res: Response, next: NextFunction):Promise<ISpecModelEntity[] | commonOutput>
   findMaterialSum(req: Request, res: Response, next: NextFunction): Promise<number | commonOutput>
   findLaboursum(req: Request, res: Response, next: NextFunction): Promise<number | commonOutput>
   updateSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}