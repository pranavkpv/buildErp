import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { purchaseOutput } from "../../../../DTO/PurchaseEntity.ts/Purchase";

export interface IGetPurchaseUseCaseEntity {
   execute(search:string,page:number,id:string):Promise<purchaseOutput | commonOutput >
}