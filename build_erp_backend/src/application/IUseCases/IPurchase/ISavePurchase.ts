import { commonOutput } from "../../dto/common";
import { purchaseInput } from "../../Entities/purchase.entity";


export interface ISavePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}