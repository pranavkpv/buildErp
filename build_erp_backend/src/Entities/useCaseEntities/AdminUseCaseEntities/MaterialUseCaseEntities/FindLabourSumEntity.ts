import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { specOutput } from "../../../../DTO/EstimationEntities/specification";

export interface IFindlabourSumUsecaseEntity {
   execute(labours:{ labour_id: string, numberoflabour: number }[]):Promise<specOutput | commonOutput>
}