import { IBudgetAndActualUsecase } from "../../IUseCases/IAdmin/IBudgetAndActual";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IPurchaseRepository } from "../../../domain/Entities/IRepository/IPurchase";
import { ITransferRepository } from "../../../domain/Entities/IRepository/ITransfer";
import { IReceiveRepository } from "../../../domain/Entities/IRepository/IReceive";
import { IAttendanceRepository } from "../../../domain/Entities/IRepository/IAttendance";
import { purchaseFailedMessage } from "../../../Shared/Messages/Purchase.Message";
import { TransferFailedMessage } from "../../../Shared/Messages/Transfer.Message";
import { ReceiveFailedMessage } from "../../../Shared/Messages/Receive.Message";
import { AttendanceFailedMessage } from "../../../Shared/Messages/Attendance.Message";
import { BudgetSuccessMessage } from "../../../Shared/Messages/BugetVsActual.Message";
import { IprojectRepository } from "../../../domain/Entities/IRepository/IProject";
import { commonOutput } from "../../dto/common";
import { budgetActualDTO } from "../../dto/admin.dashoard.dto";

export class BudgetAndActualUseCase implements IBudgetAndActualUsecase {
   constructor(
      private _projectRepository: IprojectRepository,
      private _purchaseRepository: IPurchaseRepository,
      private _transferRepository: ITransferRepository,
      private _receiveRepository: IReceiveRepository,
      private _attendanceRepository: IAttendanceRepository
   ) { }
   async execute(search: string):
      Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput> {
      const result = []
      const projectData = await this._projectRepository.getAllProjects()
      for (let element of projectData) {
         result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: element.budgeted_cost || 0, actual_expense: 0 })
      }
      const purchaseData = await this._purchaseRepository.getAllApprovedPurchases()
      if (!purchaseData) return ResponseHelper.badRequest(purchaseFailedMessage.ERROR)
      if (Array.isArray(purchaseData)) {
         for (let element of purchaseData) {
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

      const transferData = await this._transferRepository.findAllTransfer()
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
      const receiveData = await this._receiveRepository.getAllApprovedReceives()
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
      const attendanceData = await this._attendanceRepository.getApprovedAttendance()
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
      return ResponseHelper.success(BudgetSuccessMessage.FETCH, { data: actualResult, totalPage: Math.ceil(actualResult.length / 5) })
   }
}