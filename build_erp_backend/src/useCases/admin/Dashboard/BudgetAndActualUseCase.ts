import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { budgetOutput } from "../../../Entities/Input-OutputEntities/DashboardEntities/BudgetVsActualEntity";
import { IAttendanceRepository } from "../../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IPurchaseRepository } from "../../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { IReceiveRepository } from "../../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { ITransferRepository } from "../../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IBudgetAndActualUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class BudgetAndActualUseCase implements IBudgetAndActualUsecase {
   private projectRepository: IprojectRepository
   private purchaseRepository: IPurchaseRepository
   private transferRepository: ITransferRepository
   private receiveRepository: IReceiveRepository
   private attendanceRepository: IAttendanceRepository
   constructor(projectRepository: IprojectRepository, purchaseRepository: IPurchaseRepository,
      transferRepository: ITransferRepository,
      receiveRepository: IReceiveRepository,
      attendanceRepository: IAttendanceRepository
   ) {
      this.projectRepository = projectRepository
      this.purchaseRepository = purchaseRepository
      this.transferRepository = transferRepository
      this.receiveRepository = receiveRepository
      this.attendanceRepository = attendanceRepository
   }
   async execute(search: string, page: number): Promise<budgetOutput | commonOutput> {
      try {
         const result = []
         const projectData = await this.projectRepository.fetchProject()
         for (let element of projectData) {
            result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: element.budgeted_cost || 0, actual_expense: 0 })
         }
         const purchaseData = await this.purchaseRepository.findAllPurchase()
         if (!purchaseData) return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
         if (Array.isArray(purchaseData.data)) {
            for (let element of purchaseData.data) {
               for (let item of result) {
                  if (item.project_id == element.project_id) {
                     let materialSum = element.materialDetails.reduce((sum, material) => {
                        return sum += (material.quantity * material.unit_rate)
                     }, 0)
                     item.actual_expense = (item.actual_expense || 0) + materialSum
                  }
               }
            }
         }

         const transferData = await this.transferRepository.findAllTransfer()
         if (!transferData) return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
         if (Array.isArray(transferData)) {
            for (let element of transferData) {
               for (let item of result) {
                  if (item.project_id == element.from_project_id) {
                     let materialSum = element.materialDetails.reduce((sum, material) => {
                        return sum += (material.quantity * material.unit_rate)
                     }, 0)
                     item.actual_expense = (item.actual_expense || 0) - materialSum
                  }
               }
            }
         }
         const receiveData = await this.receiveRepository.findAllReceive()
         if (!receiveData) return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
         if (Array.isArray(receiveData)) {
            for (let element of receiveData) {
               for (let item of result) {
                  if (item.project_id == element.project_id) {
                     let materialSum = element.materialDetails.reduce((sum, material) => {
                        return sum += (material.quantity * material.unit_rate)
                     }, 0)
                     item.actual_expense = (item.actual_expense || 0) + materialSum
                  }
               }
            }
         }
         const attendanceData = await this.attendanceRepository.findAllAttendance()
         if (!attendanceData) return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
         if (Array.isArray(attendanceData)) {
            for (let element of attendanceData) {
               for (let item of result) {
                  if (item.project_id == element.project_id) {
                     let labourSum = element.labourDetails.reduce((sum, labour) => {
                        return sum += (labour.numberOflabour * labour.daily_wage)
                     }, 0)
                     item.actual_expense = (item.actual_expense || 0) + labourSum
                  }
               }
            }
         }
         let skip = page * 5
         const size =  result.filter(item => item.project_name.includes(search || ""))
         const actualResult = result.filter(item => item.project_name.includes(search || "")).slice(skip, skip + 5);
         return {
            success: true,
            message: SUCCESS_MESSAGE.BUDGET_VS_ACTUAL.FETCH,
            status_code: HTTP_STATUS.OK,
            data: actualResult,
            totalPage: Math.ceil(size.length / 5)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}