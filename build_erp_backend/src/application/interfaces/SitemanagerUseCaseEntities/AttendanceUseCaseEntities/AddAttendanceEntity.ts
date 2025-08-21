import { commonOutput } from "../../../dto/common";
import { InputAttendance } from "../../../entities/attendance.entity";


export interface IaddAttendanceUseCaseEntity {
   execute(input:InputAttendance):Promise<commonOutput>
}