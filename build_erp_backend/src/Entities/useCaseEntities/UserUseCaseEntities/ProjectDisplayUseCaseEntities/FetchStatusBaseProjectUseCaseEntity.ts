import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IFetchStatusBaseProjectUseCase {
   execute(status: string, search: string, area: number, page: number): Promise<projectOutput | commonOutput>
}