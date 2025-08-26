import { PurchaseDTO } from "../../../application/dto/purchase.dto"
import { purchaseInput } from "../../../application/Entities/purchase.entity"
import { IPurchaseModelEntity } from "../modelEntities/purchase.entity"

export interface IPurchaseRepository {
   getPurchasesBySearchAndPage(search: string, page: number, id: string):
      Promise<{ data: PurchaseDTO[], totalPage: number }>

   createPurchase(input: purchaseInput):
      Promise<boolean>

   updatePurchase(input: purchaseInput):
      Promise<boolean>

   deletePurchaseById(_id: string):
      Promise<void>

   approvePurchaseById(_id: string):
      Promise<void>

   getAllApprovedPurchases():
      Promise<IPurchaseModelEntity[]>

}