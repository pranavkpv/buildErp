import { commonOutput } from "../../dto/CommonEntities/common"
import { purchaseInput } from "../../dto/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { IProjectStockRepositoryEntity } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { IApprovePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"

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