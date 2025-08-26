import { IPurchaseRepository } from "../../../domain/Entities/IRepository/IPurchase"
import { ISavePurchaseUseCase } from "../../IUseCases/IPurchase/ISavePurchase"
import { purchaseFailedMessage, purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { purchaseInput } from "../../Entities/purchase.entity"
import { commonOutput } from "../../dto/common"


export class SavePurchaseUseCase implements ISavePurchaseUseCase {
   constructor(
      private _purchaseRepository: IPurchaseRepository
   ) { }
   async execute(input: purchaseInput): Promise<commonOutput> {
      const response = await this._purchaseRepository.createPurchase(input)
      if (!response) {
         return ResponseHelper.badRequest(purchaseFailedMessage.SAVE)
      }
      return ResponseHelper.createdSuccess(purchaseSuccessMessage.SAVE)
   }
}