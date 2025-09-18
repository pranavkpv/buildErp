import { PurchaseDTO } from '../../../application/dto/purchase.dto';
import { purchaseInput } from '../../../application/Entities/purchase.entity';
import { IPurchaseModelEntity } from '../modelEntities/purchase.entity';

export interface IPurchaseRepository {
   getPurchasesBySearchAndPage(search: string, page: number, id: string):
      Promise<{ data: PurchaseDTO[], totalPage: number }>

   createPurchase(input: purchaseInput):
      Promise<boolean>

   updatePurchase(input: purchaseInput):
      Promise<boolean>

   deletePurchaseById(id: string):
      Promise<void>

   approvePurchaseById(id: string):
      Promise<void>

   getAllApprovedPurchases():
      Promise<IPurchaseModelEntity[]>

   getPurchaseByProjectId(id: string):
      Promise<IPurchaseModelEntity | null>

   getPurchaseByMaterialId(id: string):
      Promise<IPurchaseModelEntity | null>

   getPurchaseByInvoice(invoice: number):
      Promise<IPurchaseModelEntity | null>

   getUnApprovedPurchaseByProjectId(id: string):
      Promise<IPurchaseModelEntity[]>

   getPurchaseByInvoiceInEdit(invoice: number, id: string):
      Promise<IPurchaseModelEntity | null>

   getAllPurchase(): Promise<IPurchaseModelEntity[]>

}