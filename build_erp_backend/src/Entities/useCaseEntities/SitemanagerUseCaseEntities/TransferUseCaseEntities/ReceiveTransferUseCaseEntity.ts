import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { TransferOutput } from "../../../Input-OutputEntities/PurchaseEntity.ts/Transfer";

export interface IReceiveTransferUseCase{
   execute(_id:string,date:string):Promise<TransferOutput | commonOutput>
}