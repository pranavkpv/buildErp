import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IApproveAttendanceUseCase{
   execute(_id:string):Promise<commonOutput>
}