import { purchaseInput, purchaseOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Purchase";

export interface IPurchaseRepository {
   findAllPurchaseBySearchandPage(search:string,page:number,id:string):Promise<purchaseOutput>
   savePurchase(input:purchaseInput):Promise<boolean>
}