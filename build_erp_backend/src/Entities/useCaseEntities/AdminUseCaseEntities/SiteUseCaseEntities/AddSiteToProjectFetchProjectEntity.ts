import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Input-OutputEntities/ProjectEntities/project";


export interface IAddSiteToprojectFetchProjectUseCase {
   execute(): Promise<projectOutput | commonOutput>
}