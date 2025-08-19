import { commonOutput } from "../../../dto/CommonEntities/common";
import { attendanceOutput } from "../../../dto/LabourEntities/attendance";

export interface IFetchAttendanceByIdUseCaseEntity {
   execute(_id:string):Promise<attendanceOutput | commonOutput>
}