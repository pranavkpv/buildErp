import { commonOutput } from "../../DTO/CommonEntities/common";
import { budgetOutput } from "../../DTO/DashboardEntities/BudgetVsActualEntity";
import { IBudgetAndActualMaterialUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/BudgetAndActualMaterialEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IEstimationRepositoryEntity } from "../../Entities/repositoryEntities/Estimation-management/IEstimationRepository";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IPurchaseRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { ITransferRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/ITransferRepository";
import { IReceiveRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IReceiveRepository";
import { userFailedMessage } from "../../Shared/Messages/User.Message";
import { purchaseFailedMessage } from "../../Shared/Messages/Purchase.Message";
import { ReceiveFailedMessage } from "../../Shared/Messages/Receive.Message";
import { BudgetSuccessMessage } from "../../Shared/Messages/BugetVsActual.Message";

export class BudgetAndActualMaterialUseCase implements IBudgetAndActualMaterialUseCaseEntity {
   private estimationRepository: IEstimationRepositoryEntity
   private projectRepository: IprojectRepositoryEntity
   private purchaseRepository: IPurchaseRepositoryEntity
   private transferRepository: ITransferRepositoryEntity
   private receiveRepository: IReceiveRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity, purchaseRepository: IPurchaseRepositoryEntity,
      transferRepository: ITransferRepositoryEntity,
      receiveRepository: IReceiveRepositoryEntity,
      estimationRepository: IEstimationRepositoryEntity
   ) {
      this.projectRepository = projectRepository
      this.purchaseRepository = purchaseRepository
      this.transferRepository = transferRepository
      this.receiveRepository = receiveRepository
      this.estimationRepository = estimationRepository
   }
   async execute(search: string): Promise<budgetOutput | commonOutput> {
      const result = []
      const projectData = await this.projectRepository.fetchProject()
      for (let element of projectData) {
         result.push({ project_id: element._id, project_name: element.project_name, budgeted_cost: 0, actual_expense: 0 })
      }
      const estimateMaterialData = await this.estimationRepository.findAllEstimationMaterial()
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
      const actualResult = result.filter(item => item.project_name.includes(search || ""))
      return ResponseHelper.success(BudgetSuccessMessage.FETCH, actualResult, Math.ceil(actualResult.length / 5))
   }
} 