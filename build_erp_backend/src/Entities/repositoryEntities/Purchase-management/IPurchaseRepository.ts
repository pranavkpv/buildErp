import { purchaseInput, purchaseOutput } from "../../../DTO/PurchaseEntity.ts/Purchase";

export interface IPurchaseRepositoryEntity {
   findAllPurchaseBySearchandPage(search:string,page:number,id:string):Promise<purchaseOutput>
   savePurchase(input:purchaseInput):Promise<boolean>
   updatePurchase(input:purchaseInput):Promise<boolean>
   deletePurchase(_id:string):Promise<void>
   approvePurchase(_id:string):Promise<void>
   findAllPurchase():Promise<purchaseOutput>
}