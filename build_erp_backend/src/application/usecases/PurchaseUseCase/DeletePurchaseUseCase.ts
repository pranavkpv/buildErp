import { commonOutput } from "../../dto/CommonEntities/common"
import { IPurchaseRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { IDeletePurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/DeletePurchaseUseCaseEntity"
import { purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"

export class DeletePurchaseUseCase implements IDeletePurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepositoryEntity
   constructor(purchaseRepository: IPurchaseRepositoryEntity) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(_id: string): Promise<commonOutput> {
      await this.purchaseRepository.deletePurchase(_id)
      return ResponseHelper.success(purchaseSuccessMessage.DELETE)
   }
}