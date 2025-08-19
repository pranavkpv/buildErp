import { NextFunction, Request, Response } from "express"
import { IBudgetAndActualUsecase } from "../../application/interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualEntity"
import { IAdminDashboardController } from "../../domain/Entities/ControllerEntities/AdminControllerEntities/IDashboardControllerEntity"
import { IBudgetAndActualMaterialUseCase } from "../../application/interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualMaterialEntity"
import { IBudgetAndActualLabourUseCase } from "../../application/interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetedAndActualLabourEntity"
import { budgetActualDTO } from "../../application/dto/admin.dashoard.dto"
import { commonOutput } from "../../application/dto/common"

export class AdminDashboardController implements IAdminDashboardController {
   constructor(
      private _bugetAndActualusecase: IBudgetAndActualUsecase,
      private _bugetAndActualMaterialUseCase: IBudgetAndActualMaterialUseCase,
      private _bugetAndActualLabourUseCase: IBudgetAndActualLabourUseCase
   ) { }
   fetchBudgetVsActual = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput> => {
      const { search } = req.query
      const result = await this._bugetAndActualusecase.execute(String(search))
      return result
   }
   fetchBudgetVsActualMaterial = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput> => {
      const { search } = req.query
      const result = await this._bugetAndActualMaterialUseCase.execute(String(search))
      return result
   }

   fetchBudgetVsActualLabour = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput> => {
      const { search } = req.query
      const result = await this._bugetAndActualLabourUseCase.execute(String(search))
      return result
   }

}