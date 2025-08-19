import { commonOutput } from "../../../dto/CommonEntities/common";
import { projectOutput } from "../../../dto/ProjectEntities/project";

export interface IDisplayAllProjectUseCaseEntity {
   execute(page:number,search:string): Promise<projectOutput | commonOutput>
}