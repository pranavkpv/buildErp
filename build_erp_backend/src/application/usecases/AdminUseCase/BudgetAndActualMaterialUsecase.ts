import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IPurchaseRepository } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository";
import { ITransferRepository } from "../../../domain/interfaces/Purchase-management/ITransferRepository";
import { IReceiveRepository } from "../../../domain/interfaces/Purchase-management/IReceiveRepository";
import { userFailedMessage } from "../../../Shared/Messages/User.Message";
import { purchaseFailedMessage } from "../../../Shared/Messages/Purchase.Message";
import { ReceiveFailedMessage } from "../../../Shared/Messages/Receive.Message";
import { BudgetSuccessMessage } from "../../../Shared/Messages/BugetVsActual.Message";
import { IEstimationRepository } from "../../../domain/interfaces/Estimation-management/IEstimationRepository";
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IBudgetAndActualMaterialUseCase } from "../../interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualMaterialEntity";
import { commonOutput } from "../../dto/common";
import { budgetActualDTO } from "../../dto/admin.dashoard.dto";

export class BudgetAndActualMaterialUseCase implements IBudgetAndActualMaterialUseCase {
   constructor(
      private _estimationRepository: IEstimationRepository,
      private _projectRepository: IprojectRepository,
      private _purchaseRepository: IPurchaseRepository,
      private _transferRepository: ITransferRepository,
      private _receiveRepository: IReceiveRepository
   ) { }
   async execute(search: string): Promise<commonOutput<{ data: budgetActualDTO[], totalPage: number }> | commonOutput> {
      const result = []
      const projectData = await this._projectRepository.fetchProject()
      for (let element of projectData) {
         result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: 0, actual_expense: 0 })
      }
      const estimateMaterialData = await this._estimationRepository.findAllEstimationMaterial()
      if (!estimateMaterialData) return ResponseHelper.badRequest(userFailedMessage.ERROR)
      if (Array.isArray(estimateMaterialData)) {
         for (let element of estimateMaterialData) {
            for (let item of result) {
               if (item.project_id == element.project_id) {
                  let materialSum = element.quantity * element.unit_rate
                  item.budgeted_cost = (item.budgeted_cost || 0) + materialSum
               }
            }
         }
      }
      const purchaseData = await this._purchaseRepository.findAllPurchase()
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
      if (!transferData) return ResponseHelper.badRequest(purchaseFailedMessage.ERROR)
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
      const receiveData = await this._receiveRepository.findAllReceive()
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
      const actualResult = result.filter(item => item.project_name.includes(search || ""))
      return ResponseHelper.success(BudgetSuccessMessage.FETCH,{ data:actualResult, totalPage:Math.ceil(actualResult.length / 5)})
   }
} 