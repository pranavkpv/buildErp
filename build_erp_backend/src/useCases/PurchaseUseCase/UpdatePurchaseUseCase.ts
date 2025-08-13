import { commonOutput } from "../../DTO/CommonEntities/common"
import { purchaseInput } from "../../DTO/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository"
import { IUpdatePurchaseUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"


export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepositoryEntity
   constructor(purchaseRepository: IPurchaseRepositoryEntity) {
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