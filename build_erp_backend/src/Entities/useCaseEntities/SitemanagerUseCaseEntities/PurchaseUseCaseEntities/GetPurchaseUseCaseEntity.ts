import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { purchaseOutput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Purchase";

export interface IGetPurchaseUseCase {
   execute(search:string,page:number,id:string):Promise<purchaseOutput | commonOutput >
}