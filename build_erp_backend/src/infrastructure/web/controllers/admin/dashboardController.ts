import { NextFunction, Request, Response } from "express"
import { budgetOutput } from "../../../../Entities/Input-OutputEntities/DashboardEntities/BudgetVsActualEntity"
import { IBudgetAndActualUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IAdminDashboardControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IDashboardControllerEntity"
import { IBudgetAndActualMaterialUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualMaterialEntity"
import { IBudgetAndActualLabourUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetedAndActualLabourEntity"

export class AdminDashboardController implements IAdminDashboardControllerEntity {
   private bugetAndActual: IBudgetAndActualUsecase
   private bugetAndActualMaterialUseCase: IBudgetAndActualMaterialUseCase
   private bugetAndActualLabourUseCase : IBudgetAndActualLabourUseCase
   constructor(bugetAndActual: IBudgetAndActualUsecase, bugetAndActualMaterialUseCase: IBudgetAndActualMaterialUseCase,
      bugetAndActualLabourUseCase : IBudgetAndActualLabourUseCase
   ) {
      this.bugetAndActual = bugetAndActual
      this.bugetAndActualMaterialUseCase = bugetAndActualMaterialUseCase
      this.bugetAndActualLabourUseCase = bugetAndActualLabourUseCase
   }
   fetchBudgetVsActual = async (req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput> => {
      const { search } = req.query
      const result = await this.bugetAndActual.execute(String(search))
      return result
   }
   fetchBudgetVsActualMaterial = async (req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput> => {
      const { search } = req.query
      const result = await this.bugetAndActualMaterialUseCase.execute(String(search))
      return result
   }

   fetchBudgetVsActualLabour = async (req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput> => {
      const { search } = req.query
      const result = await this.bugetAndActualLabourUseCase.execute(String(search))
      return result
   }

}