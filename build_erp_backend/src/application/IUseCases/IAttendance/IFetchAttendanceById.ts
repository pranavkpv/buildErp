import { commonOutput } from "../../dto/common";
import { fetchEditAttendance } from "../../Entities/attendance.entity";


export interface IFetchAttendanceByIdUseCase {
   execute(_id: string):
      Promise<commonOutput<fetchEditAttendance> | commonOutput>
}