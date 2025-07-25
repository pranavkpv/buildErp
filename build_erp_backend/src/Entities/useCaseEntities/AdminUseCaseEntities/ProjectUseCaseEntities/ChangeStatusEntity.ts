import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { statusChangeInput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IChangeStatusUseCase{
   execute(input: statusChangeInput): Promise<commonOutput>
}