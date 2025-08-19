import { commonOutput } from "../../../dto/CommonEntities/common";
import { attendanceOutput } from "../../../dto/LabourEntities/attendance";

export interface IfetchAttendanceUseCaseEntity{
   execute(search:string,page:number):Promise<attendanceOutput | commonOutput>
}