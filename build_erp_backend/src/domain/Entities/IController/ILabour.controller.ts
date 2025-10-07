import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { labourDataDisplayDTO } from '../../../application/dto/labour.dto';

export interface ILabourController {
   getPaginatedLabourList(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: labourDataDisplayDTO[]; totalPage: number }> | commonOutput | void>

   createLabour(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deleteLabour(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updateLabour(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAllLabourList(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<labourDataDisplayDTO[]> | commonOutput | void>

   getLabourById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<labourDataDisplayDTO> | commonOutput | void>
}