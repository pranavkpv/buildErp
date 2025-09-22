import { commonOutput } from '../../dto/common';
import { listTransferDTO } from '../../dto/transfer.dto';

export interface IGetUserBaseTransferUseCase {
   execute(userId:string):Promise<commonOutput<listTransferDTO[]>>
}