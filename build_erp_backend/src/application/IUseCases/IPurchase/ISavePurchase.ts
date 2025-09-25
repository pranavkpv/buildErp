import { commonOutput } from '../../dto/common';
import { purchaseInput } from '../../entities/purchase.entity';


export interface ISavePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}