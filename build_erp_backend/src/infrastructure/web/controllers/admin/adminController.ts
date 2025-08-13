import { NextFunction, Request, Response } from "express";
import { IAdminControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { IAdminLoginUseCaseEntity } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { userSuccessMessage } from "../../../../Shared/Messages/User.Message";




export class AdminController implements IAdminControllerEntity {
  private adminLoginUsecase: IAdminLoginUseCaseEntity
  constructor(adminLoginUsecase: IAdminLoginUseCaseEntity) {
    this.adminLoginUsecase = adminLoginUsecase
  }

  //------------------------------------ User login ------------------------------------//

  login = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      const result = await this.adminLoginUsecase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
        res.cookie('refreshToken', result.token.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        });
       
      } 
      return result
  }

  //------------------------------------ User logout ------------------------------------//
  
  logout = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
      res.clearCookie("refreshToken", {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
      });
      const result = ResponseHelper.success(userSuccessMessage.LOGOUT)
      return result
  }
}
