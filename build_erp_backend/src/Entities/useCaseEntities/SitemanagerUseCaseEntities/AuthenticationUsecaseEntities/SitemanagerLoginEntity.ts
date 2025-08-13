import { commonOutput } from "../../../../DTO/CommonEntities/common";

export interface ISitemanagerLoginUseCaseEntity{
   execute(email:string,password:string):Promise<commonOutput>
}