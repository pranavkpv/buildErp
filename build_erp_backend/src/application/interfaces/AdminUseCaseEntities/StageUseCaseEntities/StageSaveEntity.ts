import { commonOutput } from "../../../dto/CommonEntities/common";
import { stageInputData } from "../../../dto/ProjectEntities/Stage";

export interface IStageSaveUseCaseEntity {
   execute(input: stageInputData): Promise<commonOutput>
}