import { IGetPurchaseUseCase } from "../../IUseCases/IPurchase/IGetPurchase"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { PurchaseDTO } from "../../dto/purchase.dto"
import { IPurchaseRepository } from "../../../domain/Entities/IRepository/IPurchase"
import { PurchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"

export class GetPurchaseUseCase implements IGetPurchaseUseCase {
   constructor(
      private _purchaseRepository: IPurchaseRepository
   ) { }
   async execute(search: string, page: number, id: string):
      Promise<commonOutput<{ data: PurchaseDTO[], totalPage: number }> | commonOutput> {
      const { data, totalPage } = await this._purchaseRepository.getPurchasesBySearchAndPage(search, page, id)
      return ResponseHelper.success(PurchaseSuccessMessage.FETCH, { data, totalPage })
   }
}