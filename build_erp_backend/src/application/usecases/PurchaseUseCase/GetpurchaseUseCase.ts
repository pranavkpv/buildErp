
import { IGetPurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity"
import { purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { PurchaseDTO } from "../../dto/purchase.dto"
import { IPurchaseRepository } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"

export class GetPurchaseUseCase implements IGetPurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepository
   constructor(purchaseRepository: IPurchaseRepository) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(search: string, page: number, id: string): Promise<commonOutput<{ data: PurchaseDTO[], totalPage: number }> | commonOutput> {
      const { data, totalPage } = await this.purchaseRepository.findAllPurchaseBySearchandPage(search, page, id)
      return ResponseHelper.success(purchaseSuccessMessage.FETCH, { data, totalPage })
   }
}