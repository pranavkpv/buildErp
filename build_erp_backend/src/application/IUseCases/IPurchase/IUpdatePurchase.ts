import { commonOutput } from '../../dto/common';
import { purchaseInput } from '../../Entities/purchase.entity';


export interface IUpdatePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}