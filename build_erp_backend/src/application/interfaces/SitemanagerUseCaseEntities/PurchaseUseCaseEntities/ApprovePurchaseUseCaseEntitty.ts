import { commonOutput } from "../../../dto/common";
import { purchaseInput } from "../../../entities/purchase.entity";


export interface IApprovePurchaseUseCaseEntity {
   execute(input:purchaseInput):Promise<commonOutput>
}