import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { purchaseOutput } from "../../../Entities/Input-OutputEntities/PurchaseEntity.ts/Purchase";
import { IPurchaseRepository } from "../../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository";
import { IGetPurchaseUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class GetPurchaseUseCase implements IGetPurchaseUseCase {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(search: string, page: number,id:string): Promise<purchaseOutput | commonOutput> {
      try {
         const {data,totalPage} = await this.purchaseRepository.findAllPurchaseBySearchandPage(search,page,id)
         return {
            success:true,
            message:SUCCESS_MESSAGE.PURCHASE.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}