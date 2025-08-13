import { NextFunction } from "express-serve-static-core";
import { IRefreshTokenControllerEntity } from "../../../../Entities/ControllerEntities/Auth.Controller.Entities/RefreshToken.Controller.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { IRefreshTokenUseCaseEntity } from "../../../../Entities/useCaseEntities/Auth/RefreshToken.UseCase.Entity";
import { Request, Response } from "express";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { AuthErrorMessage, AuthSuccessMessage } from "../../../../Shared/Messages/Auth.Message";

export class RefreshTokenController implements IRefreshTokenControllerEntity {
   private refreshTokenUseCase: IRefreshTokenUseCaseEntity
   constructor(refreshTokenUseCase: IRefreshTokenUseCaseEntity) {
      this.refreshTokenUseCase = refreshTokenUseCase
   }
   handleRefreshToken = async(req: Request, res: Response, next: NextFunction): Promise<commonOutput | void> => {
      try {
         const refreshToken = req.cookies.refreshToken
         if (!refreshToken) {
            return ResponseHelper.badRequest(AuthErrorMessage.NO_REFRESH_TOKEN)
         }
         const newAccessToken = await this.refreshTokenUseCase.execute(refreshToken)
         return ResponseHelper.success(AuthSuccessMessage.ACCESS_TOKEN_CREATED, newAccessToken)
      } catch (error) {
         next(error)
      }
   }
}