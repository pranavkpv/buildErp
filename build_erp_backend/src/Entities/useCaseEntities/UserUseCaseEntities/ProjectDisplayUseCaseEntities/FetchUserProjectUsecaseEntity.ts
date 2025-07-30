import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Input-OutputEntities/ProjectEntities/project";


export interface IFetchUserProjectUseCase {
   execute(user:string):Promise<projectOutput | commonOutput >
}