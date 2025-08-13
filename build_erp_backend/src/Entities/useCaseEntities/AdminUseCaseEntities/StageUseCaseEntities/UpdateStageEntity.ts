import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { stageInputData } from "../../../../DTO/ProjectEntities/Stage";

export interface IUpdateStageUseCaseEntity {
   execute(input: stageInputData): Promise<commonOutput>
}