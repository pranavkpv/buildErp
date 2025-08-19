import { commonOutput } from "../../../dto/CommonEntities/common";
import { specOutput } from "../../../dto/EstimationEntities/specification";

export interface ISpeclistUseCaseEntity {
   execute(page:number,search:string):Promise<specOutput | commonOutput>
}