import { commonOutput } from '../../dto/common';
import { listingInput } from '../../Entities/common.entity';
import { listSpec } from '../../Entities/spec.entity';


export interface ISpeclistUseCase {
   execute(input:listingInput): Promise<commonOutput<{data:listSpec[],totalPage:number}> | commonOutput>
}