import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { specOutput } from "../../../Input-OutputEntities/EstimationEntities/specification";

export interface IFindlabourSumUsecase {
   execute(labours:{ labour_id: string, numberoflabour: number }[]):Promise<specOutput | commonOutput>
}