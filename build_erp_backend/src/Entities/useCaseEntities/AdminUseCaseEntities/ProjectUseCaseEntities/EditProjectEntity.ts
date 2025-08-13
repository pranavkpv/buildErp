import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { editProjectInput } from "../../../../DTO/ProjectEntities/project";

export interface IEditProjectUseCaseEntity {
    execute(input: editProjectInput): Promise<commonOutput> 
}