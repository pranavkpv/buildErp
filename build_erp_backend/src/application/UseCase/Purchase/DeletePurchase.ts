import { IDeletePurchaseUseCase } from "../../IUseCases/IPurchase/IDeletePurchase"
import { purchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IPurchaseRepository } from "../../../domain/Entities/IRepository/IPurchase"
import { commonOutput } from "../../dto/common"

export class DeletePurchaseUseCase implements IDeletePurchaseUseCase {
   constructor(
      private _purchaseRepository: IPurchaseRepository
   ) { }
   async execute(_id: string): Promise<commonOutput> {
      await this._purchaseRepository.deletePurchaseById(_id)
      return ResponseHelper.success(purchaseSuccessMessage.DELETE)
   }
}