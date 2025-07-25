import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteAttendanceUseCase {
   execute(_id:string):Promise<commonOutput>
}