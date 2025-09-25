import { commonOutput } from '../../dto/common';
import { transferInput } from '../../entities/transfer.entity';


export interface IUpdateTransferUseCase {
   execute(input:transferInput):Promise<commonOutput>
}