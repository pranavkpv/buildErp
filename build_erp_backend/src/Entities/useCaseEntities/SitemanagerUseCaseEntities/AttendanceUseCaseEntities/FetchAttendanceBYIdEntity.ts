import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";
import { IAttendanceModelEntity } from "../../../ModelEntities/Attendance.Entity";

export interface IFetchAttendanceByIdUseCase {
   execute(_id:string):Promise<IAttendanceModelEntity | null | commonOutput>
}