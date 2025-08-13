import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { projectOutput } from "../../../../DTO/ProjectEntities/project";

export interface IFetchStageUsecaseEntity {
   execute(search:string,page:number):Promise<projectOutput | commonOutput>
}