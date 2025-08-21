
import { IUpdatePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { purchaseInput } from "../../entities/purchase.entity"
import { IPurchaseRepository } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"


export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(input: purchaseInput): Promise<commonOutput> {
      const response = await this.purchaseRepository.updatePurchase(input)
      if (!response) {
         return ResponseHelper.badRequest(purchaseFailedMessage.UPDATE)
      }
      return ResponseHelper.success(purchaseSuccessMessage.UPDATE)
   }
}