import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";

export interface IFetchProjectUseCaseEntity {
    execute():Promise<projectOutput | commonOutput>
}