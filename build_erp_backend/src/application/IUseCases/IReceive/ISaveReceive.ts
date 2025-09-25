import { commonOutput } from '../../dto/common';
import { ReceiveInput } from '../../entities/receive.entity';


export interface ISaveReceiveUseCase {
   execute(input:ReceiveInput):Promise<commonOutput>
}