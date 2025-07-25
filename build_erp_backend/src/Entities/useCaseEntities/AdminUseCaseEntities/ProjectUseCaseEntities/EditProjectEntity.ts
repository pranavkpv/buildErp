import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editProjectInput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IEditProjectUseCase {
    execute(input: editProjectInput): Promise<commonOutput> 
}