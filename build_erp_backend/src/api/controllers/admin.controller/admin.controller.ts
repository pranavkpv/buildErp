import { NextFunction, Request, Response } from "express";
import { IAdminController } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { IAdminLoginUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { commonOutput } from "../../../application/dto/common";




export class AdminController implements IAdminController {

  constructor(private _adminLoginUsecase: IAdminLoginUseCaseEntity) { }

  //------------------------------------ Admin login ------------------------------------//

  login = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
    const result = await this._adminLoginUsecase.execute(req.body)
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

  //------------------------------------ Admin logout ------------------------------------//

  logout = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput> => {
    res.clearCookie("refreshToken", {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });
    return ResponseHelper.success(userSuccessMessage.LOGOUT)
  }
}
