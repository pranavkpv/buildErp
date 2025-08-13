import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";

export interface IDisplayAllProjectUseCaseEntity {
   execute(page:number,search:string): Promise<projectOutput | commonOutput>
}