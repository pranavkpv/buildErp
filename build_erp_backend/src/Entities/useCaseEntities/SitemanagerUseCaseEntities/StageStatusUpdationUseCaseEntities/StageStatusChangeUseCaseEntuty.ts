import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { changeStatusInput } from "../../../Input-OutputEntities/ProjectEntities/Stage";

export interface IStageStatusChangeUseCase {
   execute(input:changeStatusInput):Promise<commonOutput>
}