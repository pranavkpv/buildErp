import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { statusChangeInput } from "../../../../DTO/ProjectEntities/project";

export interface IChangeStatusUseCaseEntity{
   execute(input: statusChangeInput): Promise<commonOutput>
}