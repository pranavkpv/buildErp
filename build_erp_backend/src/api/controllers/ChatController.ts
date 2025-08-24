import { Request, Response, NextFunction } from "express";
import { IChatControllerEntity } from "../../domain/Entities/Controller.Entity/IChatControllerEntity";
import { IFetchUserUsecaseEntity } from "../../application/interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/FetchUserUseCaseEntity";
import { ResponseHelper } from "../../Shared/responseHelpers/response";
import { IJwtService } from "../../domain/Entities/Service.Entities/IJwtservice";
import { commonOutput } from "../../application/dto/common";
import { chatListDTO } from "../../application/dto/user.dto";

export class ChatController implements IChatControllerEntity {
   constructor(
      private fetchUseruseCase: IFetchUserUsecaseEntity,
      private jwtService: IJwtService
   ) { }
   fetchUserDetailsforChat = async (req: Request, res: Response, next: NextFunction): Promise<commonOutput<chatListDTO[]> | commonOutput> => {
      const userHeader = req.headers.authorization
      const accessToken = userHeader?.split(" ")[1]
      if (!accessToken) {
         return ResponseHelper.unAuthor()
      }
      const payload = await this.jwtService.verifyAccessToken(accessToken);
      if (!payload) {
         return ResponseHelper.unAuthor()
      }
      const data = await this.fetchUseruseCase.execute(payload._id)
      return data

   }
}