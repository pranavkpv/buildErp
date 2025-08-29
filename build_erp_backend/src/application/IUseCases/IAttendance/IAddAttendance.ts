import { commonOutput } from '../../dto/common';
import { InputAttendance } from '../../Entities/attendance.entity';


export interface IaddAttendanceUseCase {
   execute(input: InputAttendance):
      Promise<commonOutput>
}