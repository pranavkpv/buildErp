import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";


export interface IAddSiteToprojectFetchProjectUseCaseEntity {
   execute(): Promise<projectOutput | commonOutput>
}