import { commonOutput } from "../../DTO/CommonEntities/common"
import { purchaseInput } from "../../DTO/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository"
import { IProjectStockRepositoryEntity } from "../../Entities/repositoryEntities/Stock-management/IProjectStockRepository"
import { IApprovePurchaseUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"

export class ApprovePurchaseUseCase implements IApprovePurchaseUseCaseEntity {
  private purchaseRepository: IPurchaseRepositoryEntity
  private projectStockRepository: IProjectStockRepositoryEntity
  constructor(purchaseRepository: IPurchaseRepositoryEntity, projectStockRepository: IProjectStockRepositoryEntity) {
    this.purchaseRepository = purchaseRepository
    this.projectStockRepository = projectStockRepository
  }
  async execute(input: purchaseInput): Promise<commonOutput> {
    if (!input._id) return ResponseHelper.badRequest(purchaseFailedMessage.ID_NOT)
    await this.purchaseRepository.approvePurchase(input?._id)
    for (let char of input.materialDetails) {
      await this.projectStockRepository.IncrementStockById({ material_id: char.material_id, project_id: input.project_id, quantity: char.quantity })
    }
    return ResponseHelper.success(purchaseSuccessMessage.APPROVE)
  }
}