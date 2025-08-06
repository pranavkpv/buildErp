import { NextFunction, Request, Response } from "express"
import { budgetOutput } from "../../../../Entities/Input-OutputEntities/DashboardEntities/BudgetVsActualEntity"
import { IBudgetAndActualUsecase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualEntity"
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IAdminDashboardControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IDashboardControllerEntity"

export class AdminDashboardController implements IAdminDashboardControllerEntity {
   private bugetAndActual: IBudgetAndActualUsecase
   constructor(bugetAndActual: IBudgetAndActualUsecase) {
      this.bugetAndActual = bugetAndActual
   }
   fetchBudgetVsActual = async (req: Request, res: Response, next: NextFunction): Promise<budgetOutput | commonOutput> => {
      const {search,page} = req.query
      const result = await this.bugetAndActual.execute(String(search),Number(page))
      return result
   }
}