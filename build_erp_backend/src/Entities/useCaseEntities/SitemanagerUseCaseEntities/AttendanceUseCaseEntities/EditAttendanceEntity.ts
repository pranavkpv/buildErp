import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { editAttendanceInput } from "../../../../DTO/LabourEntities/attendance";

export interface IEditAttendanceUseCaseEntity {
   execute(input: editAttendanceInput):Promise<commonOutput>
}