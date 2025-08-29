import { commonOutput } from '../../dto/common';


export interface IApproveAttendanceUseCase {
   execute(id: string):
      Promise<commonOutput>
}