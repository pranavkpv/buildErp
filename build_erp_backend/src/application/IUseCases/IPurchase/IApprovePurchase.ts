import { commonOutput } from '../../dto/common';
import { purchaseInput } from '../../Entities/purchase.entity';


export interface IApprovePurchaseUseCase {
   execute(input:purchaseInput):Promise<commonOutput>
}