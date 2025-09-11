import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { userBaseProjectDTO } from '../../../application/dto/project.dto';

export interface IRequirementController {
   saveRequirement(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | commonOutput<userBaseProjectDTO> | void>

   updateEstimateBy(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | commonOutput<userBaseProjectDTO> | void>
}