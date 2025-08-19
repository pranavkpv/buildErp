import { commonOutput } from "../../../dto/CommonEntities/common";
import { mixMatAndLabour, specOutput } from "../../../dto/EstimationEntities/specification";

export interface ISpecSumUseCaseEntity {
   execute(input:mixMatAndLabour):Promise<specOutput | commonOutput>
}