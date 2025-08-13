import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { specOutput } from "../../../../DTO/EstimationEntities/specification";

export interface ISpeclistUseCaseEntity {
   execute(page:number,search:string):Promise<specOutput | commonOutput>
}