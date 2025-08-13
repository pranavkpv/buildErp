import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";


export interface IFetchUserProjectUseCaseEntity {
   execute(user:string):Promise<projectOutput | commonOutput >
}