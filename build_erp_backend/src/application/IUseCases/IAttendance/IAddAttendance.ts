import { commonOutput } from '../../dto/common';
import { InputAttendance } from '../../entities/attendance.entity';


export interface IaddAttendanceUseCase {
   execute(input: InputAttendance):
      Promise<commonOutput>
}