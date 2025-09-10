import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { additionEstimateDTO, estimateByProjectDTO, labourEstimateDTO, listEstimationDTO, materialEstimateDTO, specListInProjectDTO } from '../../../application/dto/estimation.dto';

export interface IEstimationController {

   createEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   sendEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   modifyEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getAllEstimations(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: listEstimationDTO[], totalPage: number }> | commonOutput | void>

   uploadEstimationImage(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getSpecListByEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<specListInProjectDTO[]> | void>;

   getEstimationById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<estimateByProjectDTO[]> | void>;

   getMaterialEstimationById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<materialEstimateDTO[]> | void>;

   getLabourEstimationById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<labourEstimateDTO[]> | void>;

   getAdditionEstimationById(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<additionEstimateDTO[]> | void>;

   rejectEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

   ApproveEstimation(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>;

}