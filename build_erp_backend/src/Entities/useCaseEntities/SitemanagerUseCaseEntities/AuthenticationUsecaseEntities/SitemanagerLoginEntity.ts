import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface ISitemanagerLoginUseCase{
   execute(email:string,password:string):Promise<commonOutput>
}