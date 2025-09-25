import { commonOutput } from '../../dto/common';
import { stageInputData } from '../../entities/stage.entity';


export interface IStageSaveUseCase {
   execute(input: stageInputData): Promise<commonOutput>
}