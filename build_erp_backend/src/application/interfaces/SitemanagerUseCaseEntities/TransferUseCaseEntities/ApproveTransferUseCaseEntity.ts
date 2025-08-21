import { commonOutput } from "../../../dto/common";
import { transferInput } from "../../../entities/transfer.entity";


export interface IApproveTransferUseCaseEntity {
   execute(input:transferInput):Promise<commonOutput>
}