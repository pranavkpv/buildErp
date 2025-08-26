import { commonOutput } from "../../dto/common";
import { changeStatusInput } from "../../Entities/sitemanager.entity";

export interface IStageStatusChangeUseCase {
   execute(input: changeStatusInput): Promise<commonOutput>
}