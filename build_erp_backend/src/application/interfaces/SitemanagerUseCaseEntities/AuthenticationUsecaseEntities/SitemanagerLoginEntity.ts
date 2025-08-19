import { commonOutput } from "../../../dto/CommonEntities/common";

export interface ISitemanagerLoginUseCaseEntity{
   execute(email:string,password:string):Promise<commonOutput>
}