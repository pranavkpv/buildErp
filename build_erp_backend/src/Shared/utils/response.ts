import { Tokens } from "../../Entities/Input-OutputEntities/auth";
import { commonOutput } from "../../Entities/Input-OutputEntities/CommonEntities/common";
import { IAdminModelEntity } from "../../Entities/ModelEntities/Admin.Entity";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";
import { IStageModelEntity } from "../../Entities/ModelEntities/Stage.Entity";
import { IUserModelEntity } from "../../Entities/ModelEntities/User.Entity";
import { HTTP_STATUS } from "../Status_code";

export const ResponseHelper = {
   success(message:string | number | IStageModelEntity[],status:number):commonOutput{
      return {
         success:true,
         message,
         status_code:status
      }
   },
   failure(message:string,status:number):commonOutput{
      return {
         success:false,
         message,
         status_code:status
      }
   },
   loginSuccess(message:string ,status:number,token:Tokens,userData:IUserModelEntity | IAdminModelEntity |ISitemanagerModelEntity):commonOutput{
       return {
         success:true,
         message,
         status_code:status,
         token:token,
         userData:userData
      }
   },
   default(error:Error):commonOutput{
      return {
         success:false,
         message:error.message,
         status_code:HTTP_STATUS.INTERNAL_SERVER_ERROR
      }
   },
   updateSuccess(message:string ,status:number,userData:IUserModelEntity | IAdminModelEntity |ISitemanagerModelEntity):commonOutput{
       return {
         success:true,
         message,
         status_code:status,
         userData:userData
      }
   }

}