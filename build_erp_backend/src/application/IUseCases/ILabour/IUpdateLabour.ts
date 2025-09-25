import { commonOutput } from '../../dto/common';
import { labourEditInput } from '../../entities/labour.entity';


export interface IUpdateLabourUseCase {
   execute(input:labourEditInput):Promise<commonOutput>
}