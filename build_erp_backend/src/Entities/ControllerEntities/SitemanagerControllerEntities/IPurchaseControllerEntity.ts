import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { purchaseOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Purchase";

export interface IPurchaseControllerEntity {
   getpurchase(req: Request, res: Response, next: NextFunction):  Promise<purchaseOutput | commonOutput>
   savePurchase(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   updatePurchase(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   deletePurchase(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   approvePurchase(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
}