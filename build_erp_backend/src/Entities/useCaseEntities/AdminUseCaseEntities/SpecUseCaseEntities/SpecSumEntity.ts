import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { mixMatAndLabour, specOutput } from "../../../Input-OutputEntities/EstimationEntities/specification";

export interface ISpecSumUseCase {
   execute(input:mixMatAndLabour):Promise<specOutput | commonOutput>
}