import { commonOutput } from '../../dto/common';
import { fetchEditAttendance } from '../../entities/attendance.entity';


export interface IFetchAttendanceByIdUseCase {
   execute(id: string):
      Promise<commonOutput<fetchEditAttendance> | commonOutput>
}