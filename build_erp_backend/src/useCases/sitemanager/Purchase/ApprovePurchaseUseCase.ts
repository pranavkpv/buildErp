import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IPurchaseRepository } from "../../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { IApprovePurchaseUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/ApprovePurchaseUseCaseEntitty";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ApprovePurchaseUseCase implements IApprovePurchaseUseCase {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(_id: string): Promise<commonOutput> {
     try {
       await this.purchaseRepository.approvePurchase(_id)
       return ResponseHelper.success(SUCCESS_MESSAGE.PURCHASE.APPROVE, HTTP_STATUS.OK)
     } catch (error:any) {
       return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}