import { NextFunction, Request, Response } from "express";
import { IAdminController } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { IAdminLoginUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { commonOutput } from "../../../application/dto/common";
import { IAdminModelEntity } from "../../../domain/Entities/modelEntities/admin.entity";
import { Tokens } from "../../../application/entities/token.entity";




export class AdminController implements IAdminController {

  constructor(private _adminLoginUsecase: IAdminLoginUseCaseEntity) { }

  //------------------------------------ Admin login ------------------------------------//

  login = async (req: Request, res: Response, next: NextFunction):  Promise<commonOutput<{ data: IAdminModelEntity, token: Tokens }> | commonOutput>=> {
    const result = await this._adminLoginUsecase.execute(req.body)
    if(!result.data){
      return ResponseHelper.conflictData(userFailedMessage.ERROR)
    }
    if (result.success && result.data.token?.refreshToken) {
      res.cookie('refreshToken', result.data.token.refreshToken, {
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
