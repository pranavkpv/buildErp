import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { mixMatAndLabour } from "../../../Input-OutputEntities/EstimationEntities/specification";

export interface ISpecSumUseCase {
   execute(input:mixMatAndLabour):Promise<number | commonOutput>
}