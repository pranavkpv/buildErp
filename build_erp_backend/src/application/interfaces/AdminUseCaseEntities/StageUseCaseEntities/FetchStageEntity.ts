import { commonOutput } from "../../../dto/CommonEntities/common";
import { projectOutput } from "../../../dto/ProjectEntities/project";

export interface IFetchStageUsecaseEntity {
   execute(search:string,page:number):Promise<projectOutput | commonOutput>
}