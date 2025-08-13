import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { mixMatAndLabour, specOutput } from "../../../../DTO/EstimationEntities/specification";

export interface ISpecSumUseCaseEntity {
   execute(input:mixMatAndLabour):Promise<specOutput | commonOutput>
}