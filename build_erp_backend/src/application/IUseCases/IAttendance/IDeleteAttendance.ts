import { commonOutput } from "../../dto/common";


export interface IDeleteAttendanceUseCase {
   execute(_id: string):
      Promise<commonOutput>
}