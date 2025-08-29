
import { commonOutput } from '../../dto/common';
import { ReceiveInput } from '../../Entities/receive.entity';

export interface IUpdateReceiveUseCase {
   execute(Input:ReceiveInput):Promise<commonOutput>
}