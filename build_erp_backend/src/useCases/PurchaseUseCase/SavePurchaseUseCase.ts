import { commonOutput } from "../../DTO/CommonEntities/common"
import { purchaseInput } from "../../DTO/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository"
import { ISavePurchaseUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"


export class SavePurchaseUseCase implements ISavePurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepositoryEntity
   constructor(purchaseRepository: IPurchaseRepositoryEntity) {
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