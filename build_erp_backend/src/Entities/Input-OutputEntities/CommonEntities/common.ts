import { IAdminModelEntity } from "../../ModelEntities/Admin.Entity";
import { ISitemanagerModelEntity } from "../../ModelEntities/Sitemanager.Entity";
import { IStageModelEntity } from "../../ModelEntities/Stage.Entity";
import { IUserModelEntity } from "../../ModelEntities/User.Entity";
import { Tokens } from "../auth";

export interface commonOutput{
   success:boolean
   message:string | number | IStageModelEntity[] 
   status_code:number
   token ?:Tokens
   userData?:IUserModelEntity | IAdminModelEntity | ISitemanagerModelEntity
}