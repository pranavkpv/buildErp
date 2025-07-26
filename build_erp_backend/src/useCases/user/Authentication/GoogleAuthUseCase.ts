import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { googleAuthLogin } from "../../../Entities/Input-OutputEntities/UserEntities/GoogleAuth";
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { IgooglAuthUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/GoogleAuthEntity";
import { JwtServiceImpl } from "../../../services/JwtService";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class GoogleAuthUseCase implements IgooglAuthUseCase {
   private UserRepository: IUserRepository
   private jwtService: JwtServiceImpl
   constructor(UserRepository: IUserRepository, jwtService: JwtServiceImpl) {
      this.UserRepository = UserRepository
      this.jwtService = jwtService
   }
   async execute(input: googleAuthLogin): Promise<commonOutput> {
      const { email, username, profile_image } = input
      const existUser = await this.UserRepository.findAuthUserByEmail(email)
      if (existUser) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.EXIST, HTTP_STATUS.CONFLICT)
      }
      const existAuthUser = await this.UserRepository.findExistAuthUser(email)
      if (existAuthUser) {
         const tokens = this.jwtService.generateTokens(existAuthUser._id, existAuthUser.email, "user")
         return ResponseHelper.loginSuccess(SUCCESS_MESSAGE.USER.LOGIN, HTTP_STATUS.OK, tokens, existAuthUser)
      }
      await this.UserRepository.createUser(email, username, profile_image)
      const savedUser = await this.UserRepository.findUserByEmail(email)
      if (!savedUser) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.EMAIL_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
      }
      const tokens = this.jwtService.generateTokens(savedUser._id, savedUser.email, "user")
      return ResponseHelper.loginSuccess(SUCCESS_MESSAGE.USER.LOGIN, HTTP_STATUS.OK, tokens, savedUser)
   }
}