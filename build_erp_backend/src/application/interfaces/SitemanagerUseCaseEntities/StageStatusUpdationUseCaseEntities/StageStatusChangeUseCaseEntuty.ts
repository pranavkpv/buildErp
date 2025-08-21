import { commonOutput } from "../../../dto/common";
import { changeStatusInput } from "../../../entities/sitemanager.entity";

export interface IStageStatusChangeUseCase {
   execute(input:changeStatusInput):Promise<commonOutput>
}