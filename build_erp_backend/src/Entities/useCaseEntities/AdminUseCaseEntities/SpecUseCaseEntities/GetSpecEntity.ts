import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { specOutput } from "../../../../DTO/EstimationEntities/specification";


export interface IgetSpecUseCaseEntity {
   execute():Promise<specOutput | commonOutput>
}