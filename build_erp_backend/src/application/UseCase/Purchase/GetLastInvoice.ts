import { IPurchaseRepository } from "../../../domain/Entities/IRepository/IPurchase";
import { PurchaseSuccessMessage } from "../../../Shared/Messages/Purchase.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { commonOutput } from "../../dto/common";
import { IGetLastInvoiceUsecase } from "../../IUseCases/IPurchase/IGetLastInvoice";

export class GetLastInvoiceUsecase implements IGetLastInvoiceUsecase {
   constructor(
      private _purchaseRepository: IPurchaseRepository
   ) { }
   async execute(): Promise<commonOutput<number>> {
      const data = await this._purchaseRepository.getAllPurchase()
      return ResponseHelper.success(PurchaseSuccessMessage.FETCH, data.length)
   }
}