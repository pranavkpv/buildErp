import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { estimationOutput } from "../../../../DTO/EstimationEntities/estimation";

export interface IDisplayEstimationUseCaseEntity{
   axecute(search:string,page:number):Promise<estimationOutput | commonOutput>
}