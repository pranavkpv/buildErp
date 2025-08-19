import { commonOutput } from "../../dto/CommonEntities/common"
import { purchaseOutput } from "../../dto/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../../domain/interfaces/Purchase-management/IPurchaseRepository"
import { IGetPurchaseUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity"
import { purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"

export class GetPurchaseUseCase implements IGetPurchaseUseCaseEntity {
   private purchaseRepository: IPurchaseRepositoryEntity
   constructor(purchaseRepository: IPurchaseRepositoryEntity) {
      this.purchaseRepository = purchaseRepository
   }
   async execute(search: string, page: number, id: string): Promise<purchaseOutput | commonOutput> {
      const { data, totalPage } = await this.purchaseRepository.findAllPurchaseBySearchandPage(search, page, id)
      return ResponseHelper.success(purchaseSuccessMessage.FETCH, data, totalPage)
   }
}