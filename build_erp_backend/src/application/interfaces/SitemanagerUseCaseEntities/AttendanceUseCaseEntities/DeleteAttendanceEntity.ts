import { commonOutput } from "../../../dto/common";


export interface IDeleteAttendanceUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}