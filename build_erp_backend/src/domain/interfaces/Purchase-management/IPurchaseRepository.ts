import { PurchaseDTO } from "../../../application/dto/purchase.dto"
import { purchaseInput } from "../../../application/entities/purchase.entity"
import { IPurchaseModelEntity } from "../../Entities/modelEntities/purchase.entity"

export interface IPurchaseRepository {
   findAllPurchaseBySearchandPage(search:string,page:number,id:string):Promise<{ data: PurchaseDTO[], totalPage: number }>
   savePurchase(input:purchaseInput):Promise<boolean>
   updatePurchase(input:purchaseInput):Promise<boolean>
   deletePurchase(_id:string):Promise<void>
   approvePurchase(_id:string):Promise<void>
   findAllPurchase():Promise<IPurchaseModelEntity[]>
}