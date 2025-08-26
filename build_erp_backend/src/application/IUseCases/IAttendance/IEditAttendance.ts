import { commonOutput } from "../../dto/common";
import { InputAttendance } from "../../Entities/attendance.entity";


export interface IEditAttendanceUseCase {
   execute(input: InputAttendance):Promise<commonOutput>
}