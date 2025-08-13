import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { attendanceOutput } from "../../../../DTO/LabourEntities/attendance";

export interface IfetchAttendanceUseCaseEntity{
   execute(search:string,page:number):Promise<attendanceOutput | commonOutput>
}