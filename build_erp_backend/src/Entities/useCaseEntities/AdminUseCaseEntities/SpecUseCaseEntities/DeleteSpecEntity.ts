import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteSpecUseCase {
   execute(_id:string):Promise<commonOutput>
}