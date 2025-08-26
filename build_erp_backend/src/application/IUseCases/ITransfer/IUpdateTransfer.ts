import { commonOutput } from "../../dto/common";
import { transferInput } from "../../Entities/transfer.entity";


export interface IUpdateTransferUseCase {
   execute(input:transferInput):Promise<commonOutput>
}