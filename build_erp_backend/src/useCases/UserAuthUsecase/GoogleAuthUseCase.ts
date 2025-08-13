import { commonOutput } from "../../DTO/CommonEntities/common";
import { googleAuthLogin } from "../../DTO/UserEntities/GoogleAuth";
import { IgooglAuthUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GoogleAuthEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { JwtService } from "../../services/JwtService";
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message";

export class GoogleAuthUseCase implements IgooglAuthUseCaseEntity {
   private UserRepository: IUserRepositoryEntity
   private jwtService: JwtService
   constructor(UserRepository: IUserRepositoryEntity, jwtService: JwtService) {
      this.UserRepository = UserRepository
      this.jwtService = jwtService
   }
   async execute(input: googleAuthLogin): Promise<commonOutput> {
      const { email, username, profile_image } = input
      const existUser = await this.UserRepository.findAuthUserByEmail(email)
      if (existUser) {
         return ResponseHelper.conflictData(userFailedMessage.EXIST_GOOGLE)
      }
      const existAuthUser = await this.UserRepository.findExistAuthUser(email)
      if (existAuthUser) {
         const tokens = this.jwtService.generateTokens(existAuthUser._id, existAuthUser.email, "user")
         return ResponseHelper.loginSuccess(userSuccessMessage.LOGIN,tokens,existAuthUser)
      }
      await this.UserRepository.createUser(email, username, profile_image)
      const savedUser = await this.UserRepository.findUserByEmail(email)
      if (!savedUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const tokens = this.jwtService.generateTokens(savedUser._id, savedUser.email, "user")
      return ResponseHelper.loginSuccess(userSuccessMessage.LOGIN,tokens,savedUser)
   }
}