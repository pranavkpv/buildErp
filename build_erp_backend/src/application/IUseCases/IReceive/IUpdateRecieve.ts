
import { commonOutput } from '../../dto/common';
import { ReceiveInput } from '../../entities/receive.entity';

export interface IUpdateReceiveUseCase {
   execute(Input:ReceiveInput):Promise<commonOutput>
}