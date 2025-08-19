import { commonOutput } from "../../../dto/CommonEntities/common";
import { purchaseInput } from "../../../dto/PurchaseEntity.ts/Purchase";

export interface IUpdatePurchaseUseCaseEntity {
   execute(input:purchaseInput):Promise<commonOutput>
}