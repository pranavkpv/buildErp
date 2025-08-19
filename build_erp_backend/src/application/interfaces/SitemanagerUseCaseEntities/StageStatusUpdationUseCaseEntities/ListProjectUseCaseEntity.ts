import { commonOutput } from "../../../dto/CommonEntities/common";
import { projectOutput } from "../../../dto/ProjectEntities/project";

export interface IListProjectUseCaseEntity {
   execute(user:string):Promise<projectOutput | commonOutput>
}