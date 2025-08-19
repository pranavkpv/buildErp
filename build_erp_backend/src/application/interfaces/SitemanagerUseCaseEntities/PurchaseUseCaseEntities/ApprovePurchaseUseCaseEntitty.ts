import { commonOutput } from "../../../dto/CommonEntities/common";
import { purchaseInput } from "../../../dto/PurchaseEntity.ts/Purchase";

export interface IApprovePurchaseUseCaseEntity {
   execute(input:purchaseInput):Promise<commonOutput>
}