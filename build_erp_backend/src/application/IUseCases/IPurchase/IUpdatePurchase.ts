import { commonOutput } from '../../dto/common';
import { purchaseInput } from '../../entities/purchase.entity';


export interface IUpdatePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}