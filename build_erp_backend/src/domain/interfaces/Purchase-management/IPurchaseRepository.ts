import { IPurchaseModelEntity } from "../../Entities/modelEntities/purchase.entity"

export interface IPurchaseRepository {
   findAllPurchaseBySearchandPage(search:string,page:number,id:string):Promise<purchaseOutput>
   savePurchase(input:purchaseInput):Promise<boolean>
   updatePurchase(input:purchaseInput):Promise<boolean>
   deletePurchase(_id:string):Promise<void>
   approvePurchase(_id:string):Promise<void>
   findAllPurchase():Promise<IPurchaseModelEntity[]>
}