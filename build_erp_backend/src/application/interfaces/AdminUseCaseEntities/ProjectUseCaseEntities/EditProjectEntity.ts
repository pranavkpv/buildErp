import { commonOutput } from "../../../dto/CommonEntities/common";
import { editProjectInput } from "../../../dto/ProjectEntities/project";

export interface IEditProjectUseCaseEntity {
    execute(input: editProjectInput): Promise<commonOutput> 
}