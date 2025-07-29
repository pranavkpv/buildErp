import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Input-OutputEntities/ProjectEntities/project";

export interface IFetchStageUsecase {
   execute(search:string,page:number):Promise<projectOutput | commonOutput>
}