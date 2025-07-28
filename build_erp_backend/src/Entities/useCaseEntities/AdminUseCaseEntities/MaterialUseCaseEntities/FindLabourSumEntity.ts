import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IFindlabourSumUsecase {
   execute(labours:{ labour_id: string, numberoflabour: number }[]):Promise<number | commonOutput>
}