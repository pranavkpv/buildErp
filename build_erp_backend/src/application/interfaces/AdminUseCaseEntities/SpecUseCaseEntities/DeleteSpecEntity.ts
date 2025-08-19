import { commonOutput } from "../../../dto/CommonEntities/common";

export interface IDeleteSpecUseCaseEntity {
   execute(_id:string):Promise<commonOutput>
}