import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { attendanceInput } from "../../../../DTO/LabourEntities/attendance";

export interface IaddAttendanceUseCaseEntity {
   execute(input:attendanceInput):Promise<commonOutput>
}