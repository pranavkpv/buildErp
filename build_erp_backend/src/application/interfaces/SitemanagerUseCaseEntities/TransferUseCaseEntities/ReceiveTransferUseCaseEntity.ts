import { commonOutput } from "../../../dto/common";
import { TransferOutput } from "../../../dto/transfer.dto";


export interface IReceiveTransferUseCaseEntity{
   execute(_id:string,date:string):Promise<commonOutput<TransferOutput[]> | commonOutput>
}