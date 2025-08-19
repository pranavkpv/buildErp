import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteAttendanceUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}