import { commonOutput } from '../../dto/common';
import { purchaseInput } from '../../entities/purchase.entity';


export interface IApprovePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}