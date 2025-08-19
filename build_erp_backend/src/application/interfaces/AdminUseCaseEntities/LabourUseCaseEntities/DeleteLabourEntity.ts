import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteLabourUseCaseEntity{
   execute(_id:string):Promise<commonOutput>
}