import { commonOutput } from '../../dto/common';
import { labourSumInput } from '../../Entities/labour.entity';


export interface IFindlabourSumUsecase {
   execute(input:labourSumInput[]):Promise<commonOutput<number> | commonOutput>
}