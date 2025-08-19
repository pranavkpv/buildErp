import { commonOutput } from "../../../dto/CommonEntities/common";
import { attendanceInput } from "../../../dto/LabourEntities/attendance";

export interface IaddAttendanceUseCaseEntity {
   execute(input:attendanceInput):Promise<commonOutput>
}