import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { purchaseInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IPurchaseRepository } from "../../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { IUpdatePurchaseUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/UpdatePurchaseUseCaseEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCase {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(input: purchaseInput): Promise<commonOutput> {
      try {
         const response = await this.purchaseRepository.updatePurchase(input)
         if (response) {
            return ResponseHelper.success(SUCCESS_MESSAGE.PURCHASE.UPDATE, HTTP_STATUS.OK)
         }
         return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}