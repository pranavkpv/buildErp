import { commonOutput } from '../../dto/common';
import { stageInputData } from '../../Entities/stage.entity';


export interface IStageSaveUseCase {
   execute(input: stageInputData): Promise<commonOutput>
}