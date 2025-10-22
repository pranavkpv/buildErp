import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { budgetActualDTO } from '../../../application/dto/admin.dashoard.dto';

export interface IAdminDashboardController {

   getOverallBudgetVsActual (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput | void>

   getMaterialBudgetVsActual (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput |void>

   getLabourBudgetVsActual (req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput |void>
}