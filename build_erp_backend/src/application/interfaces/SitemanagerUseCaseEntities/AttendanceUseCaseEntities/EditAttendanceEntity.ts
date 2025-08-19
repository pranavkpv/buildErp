import { commonOutput } from "../../../dto/CommonEntities/common";
import { editAttendanceInput } from "../../../dto/LabourEntities/attendance";

export interface IEditAttendanceUseCaseEntity {
   execute(input: editAttendanceInput):Promise<commonOutput>
}