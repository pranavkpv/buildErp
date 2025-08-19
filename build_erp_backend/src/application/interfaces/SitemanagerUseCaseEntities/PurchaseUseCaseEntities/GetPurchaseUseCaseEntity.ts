import { commonOutput } from "../../../dto/CommonEntities/common";
import { purchaseOutput } from "../../../dto/PurchaseEntity.ts/Purchase";

export interface IGetPurchaseUseCaseEntity {
   execute(search:string,page:number,id:string):Promise<purchaseOutput | commonOutput >
}