import { commonOutput } from "../../dto/common";


export interface IApproveAttendanceUseCase {
   execute(_id: string):
      Promise<commonOutput>
}