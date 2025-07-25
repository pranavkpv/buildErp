import { adminloginInput } from "../../../Input-OutputEntities/AdminEntities/admin";
import { commonOutput } from "../../../Input-OutputEntities/CommonEntities/common";

export interface IAdminLoginUseCase{
   execute(input:adminloginInput):Promise<commonOutput>
}