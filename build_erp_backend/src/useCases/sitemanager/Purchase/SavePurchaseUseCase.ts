import { response } from "express";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { purchaseInput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IPurchaseRepository } from "../../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { ISavePurchaseUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/SavePurchaseUseCaseEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";

export class SavePurchaseUseCase implements ISavePurchaseUseCase {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(input: purchaseInput): Promise<commonOutput> {
      try {
         const response = await this.purchaseRepository.savePurchase(input)
         if (response) {
        
            return ResponseHelper.success(SUCCESS_MESSAGE.PURCHASE.SAVE, HTTP_STATUS.CREATED)
         } else {
            return ResponseHelper.failure(ERROR_MESSAGE.PURCHASE.ERROR, HTTP_STATUS.BAD_REQUEST)
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}