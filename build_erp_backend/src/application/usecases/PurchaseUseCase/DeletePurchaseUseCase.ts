
import { IDeletePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/DeletePurchaseUseCaseEntity"
import { purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IPurchaseRepository } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { commonOutput } from "../../dto/common"

export class DeletePurchaseUseCase implements IDeletePurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      await this.purchaseRepository.deletePurchase(_id)
      return ResponseHelper.success(purchaseSuccessMessage.DELETE)
   }
}