import { commonOutput } from '../../dto/common';
import { verifyStageDTO } from '../../dto/stage.dto';
import { listingInput } from '../../Entities/common.entity';

export interface IFetchStageForVerifyUseCase {
   execute(input: listingInput): Promise<commonOutput<{data:verifyStageDTO[],totalPage:number}> | commonOutput>
}