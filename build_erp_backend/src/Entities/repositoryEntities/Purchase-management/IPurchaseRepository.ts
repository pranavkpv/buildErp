import { purchaseInput, purchaseOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Purchase";

export interface IPurchaseRepository {
   findAllPurchaseBySearchandPage(search:string,page:number,id:string):Promise<purchaseOutput>
   savePurchase(input:purchaseInput):Promise<boolean>
   updatePurchase(input:purchaseInput):Promise<boolean>
   deletePurchase(_id:string):Promise<void>
   approvePurchase(_id:string):Promise<void>
}