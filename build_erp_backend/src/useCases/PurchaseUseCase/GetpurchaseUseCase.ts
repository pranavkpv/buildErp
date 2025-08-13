import { commonOutput } from "../../DTO/CommonEntities/common"
import { purchaseOutput } from "../../DTO/PurchaseEntity.ts/Purchase"
import { IPurchaseRepositoryEntity } from "../../Entities/repositoryEntities/Purchase-management/IPurchaseRepository"
import { IGetPurchaseUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/PurchaseUseCaseEntities/GetPurchaseUseCaseEntity"
import { purchaseSuccessMessage } from "../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"

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