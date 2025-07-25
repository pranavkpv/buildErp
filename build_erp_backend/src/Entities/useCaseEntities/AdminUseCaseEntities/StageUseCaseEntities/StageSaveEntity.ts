import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { stageInputData } from "../../../Input-OutputEntities/ProjectEntities/Stage";

export interface IStageSaveUseCase {
   execute(input: stageInputData): Promise<commonOutput>
}