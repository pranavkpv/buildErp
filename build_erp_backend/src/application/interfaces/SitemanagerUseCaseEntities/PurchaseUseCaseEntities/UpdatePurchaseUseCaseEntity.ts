import { commonOutput } from "../../../dto/common";
import { purchaseInput } from "../../../entities/purchase.entity";


export interface IUpdatePurchaseUseCaseEntity {
   execute(input:purchaseInput):Promise<commonOutput>
}