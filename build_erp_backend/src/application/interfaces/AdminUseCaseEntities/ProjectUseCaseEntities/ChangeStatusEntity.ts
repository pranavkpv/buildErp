import { commonOutput } from "../../../dto/CommonEntities/common";
import { statusChangeInput } from "../../../dto/ProjectEntities/project";

export interface IChangeStatusUseCaseEntity{
   execute(input: statusChangeInput): Promise<commonOutput>
}