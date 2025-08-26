import { commonOutput } from "../../dto/common";
import { transferInput } from "../../Entities/transfer.entity";


export interface IApproveTransferUseCase {
   execute(input:transferInput):Promise<commonOutput>
}