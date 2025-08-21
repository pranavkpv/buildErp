import { commonOutput } from "../../../dto/common";
import { transferInput } from "../../../entities/transfer.entity";


export interface ISaveTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}