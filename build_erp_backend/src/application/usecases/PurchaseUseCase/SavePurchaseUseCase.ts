
import { IPurchaseRepository } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { ISavePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { purchaseInput } from "../../entities/purchase.entity"
import { commonOutput } from "../../dto/common"


export class SavePurchaseUseCase implements ISavePurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(input: purchaseInput): Promise<commonOutput> {
      const response = await this.purchaseRepository.savePurchase(input)
      if (!response) {
         return ResponseHelper.badRequest(purchaseFailedMessage.SAVE)
      }
      return ResponseHelper.createdSuccess(purchaseSuccessMessage.SAVE)
   }
}