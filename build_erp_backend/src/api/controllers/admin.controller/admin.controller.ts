import { NextFunction, Request, Response } from "express";
import { IAdminController } from "../../../domain/Entities/ControllerEntities/AdminControllerEntities/IAdminControllerEntity";
import { IAdminLoginUseCaseEntity } from "../../../application/interfaces/AdminUseCaseEntities/DashboardUseCaseEntities/AdminLoginEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { commonOutput } from "../../../application/dto/common";
import { IAdminModelEntity } from "../../../domain/Entities/modelEntities/admin.entity";
import { Tokens } from "../../../application/entities/token.entity";
import { IBlackListUseCase } from "../../../application/interfaces/UserUseCaseEntities/AuthenticationUseCaseEntities/IBlackListAccessToken.Usecase";
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice";




export class AdminController implements IAdminController {

  constructor(
    private _adminLoginUsecase: IAdminLoginUseCaseEntity,
    private _blacklistusecase: IBlackListUseCase,
    private _jwtservice: IJwtService
  ) { }

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
    const userHeader = req.headers.authorization
      const accessToken = userHeader?.split(" ")[1]
      if (!accessToken) {
         return ResponseHelper.unAuthor()
      }
      const payload = await this._jwtservice.verifyAccessToken(accessToken);
      if (!payload) {
         return ResponseHelper.unAuthor()
      }
      res.clearCookie("refreshToken", {
         httpOnly: true,
         sameSite: "lax",
         secure: process.env.NODE_ENV === "production"
      });
      const blackList = await this._blacklistusecase.execute(accessToken)
      if(!blackList){
         return ResponseHelper.conflictData(userFailedMessage.BLACK_LIST_FAIL)
      }
      return ResponseHelper.success(userSuccessMessage.LOGOUT);
  }
}
