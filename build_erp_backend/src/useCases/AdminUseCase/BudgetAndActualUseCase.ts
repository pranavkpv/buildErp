import { commonOutput } from "../../DTO/CommonEntities/common";
import { budgetOutput } from "../../DTO/DashboardEntities/BudgetVsActualEntity";
import { IBudgetAndActualUsecaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IPurchaseRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IReceiveRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { IAttendanceRepositoryEntity } from "../../Entities/repositoryEntities/Labour-management/IAttendanceRepository";
import { purchaseFailedMessage } from "../../Shared/Messages/Purchase.Message";
import { TransferFailedMessage } from "../../Shared/Messages/Transfer.Message";
import { ReceiveFailedMessage } from "../../Shared/Messages/Receive.Message";
import { AttendanceFailedMessage } from "../../Shared/Messages/Attendance.Message";
import { BudgetSuccessMessage } from "../../Shared/Messages/BugetVsActual.Message";

export class BudgetAndActualUseCase implements IBudgetAndActualUsecaseEntity {
   private projectRepository: IprojectRepositoryEntity
   private purchaseRepository: IPurchaseRepositoryEntity
   private transferRepository: ITransferRepositoryEntity
   private receiveRepository: IReceiveRepositoryEntity
   private attendanceRepository: IAttendanceRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity, purchaseRepository: IPurchaseRepositoryEntity,
      transferRepository: ITransferRepositoryEntity,
      receiveRepository: IReceiveRepositoryEntity,
      attendanceRepository: IAttendanceRepositoryEntity
   ) {
      this.projectRepository = projectRepository
      this.purchaseRepository = purchaseRepository
      this.transferRepository = transferRepository
      this.receiveRepository = receiveRepository
      this.attendanceRepository = attendanceRepository
   }
   async execute(search: string): Promise<budgetOutput | commonOutput> {
      const result = []
      const projectData = await this.projectRepository.fetchProject()
      for (let element of projectData) {
         result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: element.budgeted_cost || 0, actual_expense: 0 })
      }
      const purchaseData = await this.purchaseRepository.findAllPurchase()
      if (!purchaseData) return ResponseHelper.badRequest(purchaseFailedMessage.ERROR)
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
      if (!transferData) return ResponseHelper.badRequest(TransferFailedMessage.FETCH)
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
      if (!receiveData) return ResponseHelper.badRequest(ReceiveFailedMessage.FETCH)
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
      if (!attendanceData) return ResponseHelper.badRequest(AttendanceFailedMessage.FETCH)
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
      const actualResult = result.filter(item => item.project_name.includes(search || ""))
      return ResponseHelper.success(BudgetSuccessMessage.FETCH, actualResult, Math.ceil(actualResult.length / 5))
   }
}