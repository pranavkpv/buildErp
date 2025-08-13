import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { changeStatusInput } from "../../../../DTO/ProjectEntities/Stage";

export interface IStageStatusChangeUseCaseEntity {
   execute(input:changeStatusInput):Promise<commonOutput>
}