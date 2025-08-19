import { commonOutput } from "../../../dto/CommonEntities/common";
import { addProjectInput } from "../../../dto/ProjectEntities/project";

export interface IAddProjectUseCaseEntity {
   execute(input: addProjectInput): Promise<commonOutput>
}