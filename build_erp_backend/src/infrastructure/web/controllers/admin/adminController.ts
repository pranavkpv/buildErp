import { NextFunction, Request, Response } from "express";
import { IAdminControllerEntity } from "../../../../Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { IAdminLoginUseCase } from "../../../../Entities/useCaseEntities/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity";
import { ResponseHelper } from "../../../../Shared/utils/response";
import { SUCCESS_MESSAGE } from "../../../../Shared/Message";
import { HTTP_STATUS } from "../../../../Shared/Status_code";




export class AdminController implements IAdminControllerEntity {
  private adminLoginUsecase: IAdminLoginUseCase
  constructor(adminLoginUsecase: IAdminLoginUseCase) {
    this.adminLoginUsecase = adminLoginUsecase
  }
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const result = await this.adminLoginUsecase.execute(req.body)
      if (result.success && result.token?.refreshToken) {
        res.cookie('refreshToken', result.token.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: 'lax',
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(result.status_code).json(result)
      } else {
        res.status(result.status_code).json(result)
      }
  }
  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res.clearCookie("refreshToken", {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
      });
      const result = ResponseHelper.success(SUCCESS_MESSAGE.USER.LOGOUT,HTTP_STATUS.OK)
      res.status(result.status_code).json(result)
  }
}
