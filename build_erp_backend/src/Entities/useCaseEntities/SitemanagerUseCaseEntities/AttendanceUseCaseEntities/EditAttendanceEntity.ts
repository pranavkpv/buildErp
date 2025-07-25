import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { editAttendanceInput } from "../../../Input-OutputEntities/LabourEntities/attendance";

export interface IEditAttendanceUseCase {
   execute(input: editAttendanceInput):Promise<commonOutput>
}