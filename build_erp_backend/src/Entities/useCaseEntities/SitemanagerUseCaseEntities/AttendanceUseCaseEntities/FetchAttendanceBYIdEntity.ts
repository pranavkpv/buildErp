import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { attendanceOutput } from "../../../Input-OutputEntities/LabourEntities/attendance";

export interface IFetchAttendanceByIdUseCase {
   execute(_id:string):Promise<attendanceOutput | commonOutput>
}