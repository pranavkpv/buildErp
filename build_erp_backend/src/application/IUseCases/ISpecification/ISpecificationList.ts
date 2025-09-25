import { commonOutput } from '../../dto/common';
import { listingInput } from '../../entities/common.entity';
import { listSpec } from '../../entities/spec.entity';


export interface ISpeclistUseCase {
   execute(input:listingInput): Promise<commonOutput<{data:listSpec[],totalPage:number}> | commonOutput>
}