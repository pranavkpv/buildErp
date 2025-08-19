import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/common";
import { budgetActualDTO } from "../../../../application/dto/admin.dashoard.dto";

export interface IAdminDashboardController {
   fetchBudgetVsActual(req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput>
   fetchBudgetVsActualMaterial(req: Request, res: Response, next: NextFunction):  Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput>
   fetchBudgetVsActualLabour(req: Request, res: Response, next: NextFunction):  Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput>
}