import { NextFunction, Request, Response } from "express";
import { IAdminControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { IAdminLoginUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity";
import { ResponseHelper } from "../../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../../Shared/Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";
import { commonOutput } from "../../../../Entities/Input-OutputEntities/CommonEntities/common";




export class AdminController implements IAdminControllerEntity {
  private adminLoginUsecase: IAdminLoginUseCase
  constructor(adminLoginUsecase: IAdminLoginUseCase) {
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
      const result = ResponseHelper.success(SUCCESS_MESSAGE.USER.LOGOUT,HTTP_STATUS.OK)
      return result
  }
}
