import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { listEstimationDTO, specListInProjectDTO } from '../../../application/dto/estimation.dto';

export interface IEstimationController {

   createEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   removeEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   modifyEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAllEstimations(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listEstimationDTO[], totalPage: number }> | commonOutput | void>

   uploadEstimationImage(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getSpecListByEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<specListInProjectDTO[]> | void>

}