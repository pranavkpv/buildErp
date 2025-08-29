import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { specFullDTO } from '../../../application/dto/specification.dto';


export interface ISpecController {

   getSpecifications(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<specFullDTO[]> | commonOutput | void>

   calculateMaterialSum(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void>

   calculateLabourSum(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void>

   getSpecificationList(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: any[], totalPage: number }> | commonOutput | void>

   createSpecification(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getLabourMaterialSum(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | commonOutput | void>

   removeSpecification(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateSpecification(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

}