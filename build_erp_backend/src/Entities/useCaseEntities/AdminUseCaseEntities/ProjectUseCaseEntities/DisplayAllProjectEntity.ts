import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IDisplayAllProjectUseCase {
   execute(page:number,search:string): Promise<projectOutput | commonOutput>
}