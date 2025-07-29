import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { attendanceOutput } from "../../../Input-OutputEntities/LabourEntities/attendance";

export interface IfetchAttendanceUseCase{
   execute(search:string,page:number):Promise<attendanceOutput | commonOutput>
}