import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../../../application/dto/CommonEntities/common";
import { RecieveOutput } from "../../../../application/dto/PurchaseEntity.ts/Receive";

export interface IReceiveControllerEntity {
   saveRecieve(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getRecieve(req: Request, res: Response, next: NextFunction): Promise<RecieveOutput | commonOutput>
   updateRecieve(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   deleteReceive(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   approveReceive(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
}