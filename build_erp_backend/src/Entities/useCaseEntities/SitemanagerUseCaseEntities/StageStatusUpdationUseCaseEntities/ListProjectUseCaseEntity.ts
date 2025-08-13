import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";

export interface IListProjectUseCaseEntity {
   execute(user:string):Promise<projectOutput | commonOutput>
}