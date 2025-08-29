import { commonOutput } from '../../dto/common';
import { PurchaseDTO } from '../../dto/purchase.dto';


export interface IGetPurchaseUseCase {
   execute(search: string, page: number, id: string):
      Promise<commonOutput<{ data: PurchaseDTO[], totalPage: number }> | commonOutput>
}