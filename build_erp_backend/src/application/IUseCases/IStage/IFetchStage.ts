import { commonOutput } from '../../dto/common';
import { stageListDTO } from '../../dto/stage.dto';
import { listingInput } from '../../entities/common.entity';

export interface IFetchStageUsecase {
   execute(input:listingInput):Promise<commonOutput<{data:stageListDTO[],totalPage:number}> | commonOutput>
}