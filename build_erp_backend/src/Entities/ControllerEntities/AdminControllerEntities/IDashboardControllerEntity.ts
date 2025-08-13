import { NextFunction, Request, Response } from "express";
import { budgetOutput } from "../../../DTO/DashboardEntities/BudgetVsActualEntity";
import { commonOutput } from "../../../DTO/CommonEntities/common";

export interface IAdminDashboardControllerEntity {
   fetchBudgetVsActual(req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput>
   fetchBudgetVsActualMaterial(req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput>
   fetchBudgetVsActualLabour(req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput>
}