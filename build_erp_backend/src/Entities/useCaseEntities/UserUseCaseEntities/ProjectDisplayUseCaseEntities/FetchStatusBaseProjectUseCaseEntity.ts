import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";

export interface IFetchStatusBaseProjectUseCaseEntity {
   execute(status: string, search: string, area: number, page: number): Promise<projectOutput | commonOutput>
}