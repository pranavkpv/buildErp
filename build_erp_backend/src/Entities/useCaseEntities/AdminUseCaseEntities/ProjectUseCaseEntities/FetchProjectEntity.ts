import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IFetchProjectUseCase {
    execute():Promise<projectOutput | commonOutput>
}