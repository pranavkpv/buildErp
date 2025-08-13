import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteLabourUseCaseEntity{
   execute(_id:string):Promise<commonOutput>
}