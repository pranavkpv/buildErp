import { IAttendanceModelEntity } from "../../../ModelEntities/Attendance.Entity";

export interface IFetchAttendanceByIdUseCase {
   execute(_id:string):Promise<IAttendanceModelEntity | null>
}