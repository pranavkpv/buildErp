export interface IFindlabourSumUsecase {
   execute(labours:{ labour_id: string, numberoflabour: number }[]):Promise<number>
}