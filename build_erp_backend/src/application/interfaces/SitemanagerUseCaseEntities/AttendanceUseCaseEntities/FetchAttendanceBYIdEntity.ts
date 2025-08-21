import { commonOutput } from "../../../dto/common";
import { fetchEditAttendance } from "../../../entities/attendance.entity";


export interface IFetchAttendanceByIdUseCaseEntity {
   execute(_id:string):Promise<commonOutput<fetchEditAttendance> | commonOutput>
}