import { Tokens } from "../../DTO/AuthEntities/auth";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IAdminModelEntity } from "../../Entities/ModelEntities/Admin.Entity";
import { ISitemanagerModelEntity } from "../../Entities/ModelEntities/Sitemanager.Entity";
import { IUserModelEntity } from "../../Entities/ModelEntities/User.Entity";
import { AuthErrorMessage } from "../Messages/Auth.Message";
import { HTTP_STATUS } from "../Status_code";

export const ResponseHelper = {

   //----------- common success message using edit ,delete,fetch-----------//

   success(message: string, data?: any | any[],totalPage?:number): commonOutput {
      return {
         success: true,
         message,
         status_code: HTTP_STATUS.OK,
         data,
         totalPage
      }
   },

   //----------- common success message using save-----------//

   createdSuccess(message: string): commonOutput {
      return {
         success: true,
         message,
         status_code: HTTP_STATUS.CREATED,
      }
   },

   //----------- Login success message-----------//

   loginSuccess(message: string, token: Tokens, userData: IUserModelEntity | IAdminModelEntity | ISitemanagerModelEntity): commonOutput {
      return {
         success: true,
         message,
         status_code: HTTP_STATUS.OK,
         token: token,
         data: userData
      }
   },

   //-----------request bad failure message-----------//

   badRequest(message: string): commonOutput {
      return {
         success: false,
         message,
         status_code: HTTP_STATUS.BAD_REQUEST
      }
   },

   //-----------for any conflict existing the client request -----------//

   conflictData(message: string): commonOutput {
      return {
         success: false,
         message,
         status_code: HTTP_STATUS.CONFLICT
      }
   },

   //-----------UnAuthorized situation happen -----------//

   unAuthor(): commonOutput {
      return {
         success: false,
         message:AuthErrorMessage.NOT_ACCESS,
         status_code: HTTP_STATUS.UNAUTHORIZED
      }
   },

   //----------- Default Catch Error message-----------//

   default(error: Error): commonOutput {
      return {
         success: false,
         message: error.message,
         status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR
      }
   },

   //----------- Default Server Error message-----------//

   serverError(message: string): commonOutput {
      return {
         success: false,
         message,
         status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR
      }
   },
}