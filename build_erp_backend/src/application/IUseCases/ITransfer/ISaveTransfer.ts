import { commonOutput } from '../../dto/common';
import { transferInput } from '../../Entities/transfer.entity';


export interface ISaveTransferUseCase {
   execute(input: transferInput): Promise<commonOutput>
}