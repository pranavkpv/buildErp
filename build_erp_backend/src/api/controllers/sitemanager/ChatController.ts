import { Request, Response, NextFunction } from "express";
import { IChatControllerEntity } from "../../../domain/Entities/ControllerEntities/SitemanagerControllerEntities/IChatControllerEntity";
import { chatListOutput } from "../../../application/dto/Chat.Entities/Chatlist.Entity";
import { IFetchUserUsecaseEntity } from "../../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchUserUseCaseEntity";
import { IJwtServiceEntity } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { commonOutput } from "../../../application/dto/CommonEntities/common";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { AuthErrorMessage } from "../../../Shared/Messages/Auth.Message";

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