import { commonOutput } from '../../dto/common';
import { InputAttendance } from '../../entities/attendance.entity';


export interface IEditAttendanceUseCase {
   execute(input: InputAttendance):Promise<commonOutput>
}