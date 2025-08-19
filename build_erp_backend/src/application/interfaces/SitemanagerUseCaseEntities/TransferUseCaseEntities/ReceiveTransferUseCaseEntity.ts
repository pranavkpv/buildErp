import { commonOutput } from "../../../dto/CommonEntities/common";
import { TransferOutput } from "../../../dto/PurchaseEntity.ts/Transfer";

export interface IReceiveTransferUseCaseEntity{
   execute(_id:string,date:string):Promise<TransferOutput | commonOutput>
}