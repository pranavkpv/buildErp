
import { IApprovePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IPurchaseRepository } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { IProjectStockRepository } from "../../../domain/interfaces/Stock-management/IProjectStockRepository"
import { purchaseInput } from "../../entities/purchase.entity"
import { commonOutput } from "../../dto/common"

export class ApprovePurchaseUseCase implements IApprovePurchaseUseCaseEntity {
  
  constructor(
    private purchaseRepository: IPurchaseRepository,
  private projectStockRepository: IProjectStockRepository
  ) {
  }
  async execute(input: purchaseInput): Promise<commonOutput> {
    if (!input._id) return ResponseHelper.badRequest(purchaseFailedMessage.ID_NOT)
    await this.purchaseRepository.approvePurchase(input?._id)
    for (let char of input.materialDetails) {
      await this.projectStockRepository.IncrementStockById({ material_id: char.material_id, project_id: input.project_id, quantity: Number(char.quantity) })
    }
    return ResponseHelper.success(purchaseSuccessMessage.APPROVE)
  }
}