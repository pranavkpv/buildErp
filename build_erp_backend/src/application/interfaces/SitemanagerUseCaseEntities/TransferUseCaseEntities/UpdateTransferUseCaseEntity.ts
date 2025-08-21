import { commonOutput } from "../../../dto/common";
import { transferInput } from "../../../entities/transfer.entity";


export interface IUpdateTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}