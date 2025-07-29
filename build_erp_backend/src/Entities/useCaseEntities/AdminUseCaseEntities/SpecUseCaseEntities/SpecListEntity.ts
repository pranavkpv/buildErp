import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { specOutput } from "../../../Input-OutputEntities/EstimationEntities/specification";

export interface ISpeclistUseCase {
   execute(page:number,search:string):Promise<specOutput | commonOutput>
}