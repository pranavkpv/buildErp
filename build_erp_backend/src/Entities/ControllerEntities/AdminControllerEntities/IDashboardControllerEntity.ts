import { NextFunction, Request, Response } from "express";
import { budgetOutput } from "../../Input-OutputEntities/DashboardEntities/BudgetVsActualEntity";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";

export interface IAdminDashboardControllerEntity {
   fetchBudgetVsActual(req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput>
   fetchBudgetVsActualMaterial(req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput>
   fetchBudgetVsActualLabour(req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput>
}