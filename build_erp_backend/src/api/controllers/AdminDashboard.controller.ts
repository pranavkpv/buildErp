import { NextFunction, Request, Response } from 'express';
import { IBudgetAndActualUsecase } from '../../application/IUseCases/IAdmin/IBudgetAndActual';
import { IAdminDashboardController } from '../../domain/Entities/IController/IAdminDashboard.controller';
import { IBudgetAndActualMaterialUseCase } from '../../application/IUseCases/IAdmin/IBudgetAndActualMaterial';
import { IBudgetAndActualLabourUseCase } from '../../application/IUseCases/IAdmin/IBudgetedAndActualLabour';
import { budgetActualDTO } from '../../application/dto/admin.dashoard.dto';
import { commonOutput } from '../../application/dto/common';

export class AdminDashboardController implements IAdminDashboardController {
    constructor(
      private _budgetAndActualUseCase: IBudgetAndActualUsecase,
      private _budgetAndActualMaterialUseCase: IBudgetAndActualMaterialUseCase,
      private _budgetAndActualLabourUseCase: IBudgetAndActualLabourUseCase,
    ) { }

    // Fetch budget vs actual data (overall)
    getOverallBudgetVsActual  = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search } = req.query;
            const result = await this._budgetAndActualUseCase.execute(String(search));
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch budget vs actual data for materials
    getMaterialBudgetVsActual  = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search } = req.query;
            const result = await this._budgetAndActualMaterialUseCase.execute(String(search));
            return result;
        } catch (error) {
            next(error);
        }
    };

    // Fetch budget vs actual data for labour
    getLabourBudgetVsActual  = async(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput | void> => {
        try {
            const { search } = req.query;
            const result = await this._budgetAndActualLabourUseCase.execute(String(search));
            return result;
        } catch (error) {
            next(error);
        }
    };
}
