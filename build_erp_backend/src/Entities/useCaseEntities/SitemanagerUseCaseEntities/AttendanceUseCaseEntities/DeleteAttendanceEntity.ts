import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteAttendanceUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}