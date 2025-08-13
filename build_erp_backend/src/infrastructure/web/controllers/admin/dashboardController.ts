import { NextFunction, Request, Response } from "express"
import { budgetOutput } from "../../../../DTO/DashboardEntities/BudgetVsActualEntity"
import { IBudgetAndActualUsecaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualEntity"
import { commonOutput } from "../../../../DTO/CommonEntities/common"
import { IAdminDashboardControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IDashboardControllerEntity"
import { IBudgetAndActualMaterialUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualMaterialEntity"
import { IBudgetAndActualLabourUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetedAndActualLabourEntity"

export class AdminDashboardController implements IAdminDashboardControllerEntity {
   private bugetAndActual: IBudgetAndActualUsecaseEntity
   private bugetAndActualMaterialUseCase: IBudgetAndActualMaterialUseCaseEntity
   private bugetAndActualLabourUseCase : IBudgetAndActualLabourUseCaseEntity
   constructor(bugetAndActual: IBudgetAndActualUsecaseEntity, bugetAndActualMaterialUseCase: IBudgetAndActualMaterialUseCaseEntity,
      bugetAndActualLabourUseCase : IBudgetAndActualLabourUseCaseEntity
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