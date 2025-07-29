import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { specOutput } from "../../../Input-OutputEntities/EstimationEntities/specification";


export interface IgetSpecUseCase {
   execute():Promise<specOutput | commonOutput>
}