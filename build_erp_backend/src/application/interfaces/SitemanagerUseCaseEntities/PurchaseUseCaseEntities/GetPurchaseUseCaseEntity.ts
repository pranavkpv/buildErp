import { commonOutput } from "../../../dto/common";
import { PurchaseDTO } from "../../../dto/purchase.dto";


export interface IGetPurchaseUseCaseEntity {
   execute(search:string,page:number,id:string):Promise<commonOutput<{data:PurchaseDTO[],totalPage:number}> | commonOutput>
}