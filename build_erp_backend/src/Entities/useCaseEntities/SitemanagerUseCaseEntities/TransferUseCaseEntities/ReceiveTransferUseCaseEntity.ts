import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { TransferOutput } from "../../../../DTO/PurchaseEntity.ts/Transfer";

export interface IReceiveTransferUseCaseEntity{
   execute(_id:string,date:string):Promise<TransferOutput | commonOutput>
}