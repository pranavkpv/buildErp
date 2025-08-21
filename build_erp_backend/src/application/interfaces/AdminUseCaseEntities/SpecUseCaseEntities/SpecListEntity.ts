import { commonOutput } from "../../../dto/common";
import { listingInput } from "../../../entities/common.entity";


export interface ISpeclistUseCase {
   execute(input:listingInput): Promise<commonOutput<{data:any[],totalPage:number}> | commonOutput>
}