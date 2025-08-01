import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { purchaseInput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Purchase";

export interface IUpdatePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}