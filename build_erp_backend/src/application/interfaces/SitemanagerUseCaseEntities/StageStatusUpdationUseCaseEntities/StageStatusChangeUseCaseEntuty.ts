import { commonOutput } from "../../../dto/CommonEntities/common";
import { changeStatusInput } from "../../../dto/ProjectEntities/Stage";

export interface IStageStatusChangeUseCaseEntity {
   execute(input:changeStatusInput):Promise<commonOutput>
}