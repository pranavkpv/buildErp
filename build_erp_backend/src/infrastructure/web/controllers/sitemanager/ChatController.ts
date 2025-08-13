import { Request, Response, NextFunction } from "express";
import { IChatControllerEntity } from "../../../../Entities/ControllerEntities/SitemanagerControllerEntities/IChatControllerEntity";
import { chatListOutput } from "../../../../DTO/Chat.Entities/Chatlist.Entity";
import { IFetchUserUsecaseEntity } from "../../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchUserUseCaseEntity";
import { IJwtServiceEntity } from "../../../../Entities/Service.Entities/IToken.Entity";
import { commonOutput } from "../../../../DTO/CommonEntities/common";
import { ResponseHelper } from "../../../../Shared/ResponseHelper/response";
import { AuthErrorMessage } from "../../../../Shared/Messages/Auth.Message";

export class ChatController implements IChatControllerEntity {
   private fetchUseruseCase: IFetchUserUsecaseEntity
   private jwtService: IJwtServiceEntity
   constructor(fetchUseruseCase: IFetchUserUsecaseEntity, jwtService: IJwtServiceEntity) {
      this.fetchUseruseCase = fetchUseruseCase
      this.jwtService = jwtService
   }
   fetchUserDetailsforChat = async (req: Request, res: Response, next: NextFunction): Promise<chatListOutput | commonOutput> => {
      const token = req.cookies.refreshToken
      const tokenData = await this.jwtService.verifyRefreshToken(token)
      if (tokenData) {
         const data = await this.fetchUseruseCase.execute(tokenData.userId)
         return data
      } else {
         return ResponseHelper.conflictData(AuthErrorMessage.INVALID_REFRESH_TOKEN)
      }
   }
}