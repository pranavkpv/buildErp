import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { addProjectInput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IAddProjectUseCase {
   execute(input: addProjectInput): Promise<commonOutput>
}