import { commonOutput } from '../../dto/common';
import { labourSumInput } from '../../entities/labour.entity';


export interface IFindlabourSumUsecase {
   execute(input:labourSumInput[]):Promise<commonOutput<number> | commonOutput>
}