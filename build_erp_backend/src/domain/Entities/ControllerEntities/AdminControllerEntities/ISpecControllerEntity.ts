import { NextFunction, Request, Response } from "express"
import { commonOutput } from "../../../../application/dto/common"
import { specFullDTO } from "../../../../application/dto/specification.dto"


export interface ISpecController {
   fetchSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput<specFullDTO[]> | commonOutput>
   findMaterialSum(req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> | commonOutput>
   findLaboursum(req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> | commonOutput>
   saveSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   fetchlabourMaterial(req: Request, res: Response, next: NextFunction): Promise<commonOutput<number> | commonOutput>
   deleteSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getSpeclist(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{data:any[],totalPage:number}> | commonOutput>
   updateSpec(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}