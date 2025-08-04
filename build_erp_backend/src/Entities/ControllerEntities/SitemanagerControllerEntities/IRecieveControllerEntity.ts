import { NextFunction, Request, Response } from "express";
import { commonOutput } from "../../Input-OutputEntities/CommonEntities/common";
import { RecieveOutput } from "../../Input-OutputEntities/PurchaseEntity.ts/Receive";

export interface IReceiveControllerEntity {
   saveRecieve(req: Request, res: Response, next: NextFunction): Promise<commonOutput>
   getRecieve(req: Request, res: Response, next: NextFunction): Promise< RecieveOutput | commonOutput>
}