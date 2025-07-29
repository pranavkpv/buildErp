import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { EstimationData, estimationOutput } from "../../../Input-OutputEntities/EstimationEntities/estimation";

export interface IFetchExistEstimationUseCase{
   execute(_id:string):Promise <estimationOutput | commonOutput>
}