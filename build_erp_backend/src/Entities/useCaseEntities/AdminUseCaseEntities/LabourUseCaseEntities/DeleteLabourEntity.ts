import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IDeleteLabourUseCase{
   execute(_id:string):Promise<commonOutput>
}