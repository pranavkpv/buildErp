import { commonOutput } from '../../dto/common';


export interface IDeleteAttendanceUseCase {
   execute(id: string):
      Promise<commonOutput>
}