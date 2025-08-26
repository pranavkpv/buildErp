import { IUpdatePurchaseUseCase } from "../../IUseCases/IPurchase/IUpdatePurchase"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { purchaseInput } from "../../Entities/purchase.entity"
import { IPurchaseRepository } from "../../../domain/Entities/IRepository/IPurchase"


export class UpdatePurchaseUseCase implements IUpdatePurchaseUseCase {
   constructor(
      private _purchaseRepository: IPurchaseRepository
   ) { }
   async execute(input: purchaseInput): Promise<commonOutput> {
      const response = await this._purchaseRepository.updatePurchase(input)
      if (!response) {
         return ResponseHelper.badRequest(purchaseFailedMessage.UPDATE)
      }
      return ResponseHelper.success(purchaseSuccessMessage.UPDATE)
   }
}