import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { attendanceInput } from "../../../Input-OutputEntities/LabourEntities/attendance";

export interface IaddAttendanceUseCase {
   execute(input:attendanceInput):Promise<commonOutput>
}