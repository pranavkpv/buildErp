import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface IDeleteSpecUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}