import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { estimationOutput, SpecData } from "../../../Input-OutputEntities/EstimationEntities/estimation";

export interface IDisplayEstimationUseCase{
   axecute(search:string,page:number):Promise<estimationOutput | commonOutput>
}