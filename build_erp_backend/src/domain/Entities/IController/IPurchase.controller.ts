import { NextFunction, Request, Response } from 'express';
import { commonOutput } from '../../../application/dto/common';
import { PurchaseDTO } from '../../../application/dto/purchase.dto';


export interface IPurchaseController {

   getPurchases(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<{ data: PurchaseDTO[], totalPage: number }> | commonOutput | void>

   savePurchase(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   updatePurchase(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   deletePurchase(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   approvePurchase(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput | void>

   getLastInvoice(req: Request, res: Response, next: NextFunction):
      Promise<commonOutput<number> | void>
}