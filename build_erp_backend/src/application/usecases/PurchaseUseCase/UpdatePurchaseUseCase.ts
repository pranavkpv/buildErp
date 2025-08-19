import { commonOutput } from "../../dto/CommonEntities/common"
import { purchaseInput } from "../../dto/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { IUpdatePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"


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