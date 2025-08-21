import { commonOutput } from "../../../dto/common";
import { purchaseInput } from "../../../entities/purchase.entity";


export interface ISavePurchaseUseCaseEntity {
   execute(input:purchaseInput):Promise<commonOutput>
}