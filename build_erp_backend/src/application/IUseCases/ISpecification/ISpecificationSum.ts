import { commonOutput } from '../../dto/common';
import { mixMatAndLabour } from '../../Entities/spec.entity';


export interface ISpecSumUseCase {
   execute(input:mixMatAndLabour):Promise<commonOutput<number> | commonOutput>
}