import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { attendanceOutput } from "../../../../DTO/LabourEntities/attendance";

export interface IFetchAttendanceByIdUseCaseEntity {
   execute(_id:string):Promise<attendanceOutput | commonOutput>
}