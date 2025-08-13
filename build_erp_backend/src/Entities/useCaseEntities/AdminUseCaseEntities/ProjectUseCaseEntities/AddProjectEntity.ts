import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { addProjectInput } from "../../../../DTO/ProjectEntities/project";

export interface IAddProjectUseCaseEntity {
   execute(input: addProjectInput): Promise<commonOutput>
}