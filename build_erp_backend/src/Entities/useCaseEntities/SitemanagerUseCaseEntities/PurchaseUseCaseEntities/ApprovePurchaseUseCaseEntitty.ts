import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { purchaseInput } from "../../../../DTO/PurchaseEntity.ts/Purchase";

export interface IApprovePurchaseUseCaseEntity {
   execute(input:purchaseInput):Promise<commonOutput>
}