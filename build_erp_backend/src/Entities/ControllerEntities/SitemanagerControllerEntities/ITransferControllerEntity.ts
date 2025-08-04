import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Transfer";

export interface ITransferController {
   getTransfer(req: Request, res: Response, next: NextFunction):  Promise<TransferOutput | commonOutput>
   getToProject(req: Request, res: Response, next: NextFunction):  Promise<TransferOutput | commonOutput>
   saveTransfer(req: Request, res: Response, next: NextFunction):  Promise<TransferOutput | commonOutput>
   updateTransfer(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   deleteTransfer(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   approveTransfer(req: Request, res: Response, next: NextFunction):  Promise<commonOutput>
   receiveTransfer(req: Request, res: Response, next: NextFunction):  Promise<TransferOutput | commonOutput>
}