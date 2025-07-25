import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IUpdateProfileImageUseCase {
   execute(url:string,_id:string) : Promise<commonOutput>
}