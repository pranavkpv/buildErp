import { commonOutput } from '../../dto/common';
import { stageInputData } from '../../entities/stage.entity';


export interface IUpdateStageUseCase {
   execute(input: stageInputData): Promise<commonOutput>
}