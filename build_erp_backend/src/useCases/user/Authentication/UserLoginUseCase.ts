import { IHasher } from "../../../Entities/repositoryEntities/Auth-management/IHasher"
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { loginInput } from "../../../Entities/Input-OutputEntities/UserEntities/user"
import { JwtServiceImpl } from "../../../services/JwtService"
import { IUserLoginUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UserLoginEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"





export class UserLoginUseCase implements IUserLoginUseCase {
   private UserRepository: IUserRepository
   private Hasher: IHasher
   private jwtService : JwtServiceImpl
   constructor(UserRepository: IUserRepository, Hasher: IHasher,jwtService : JwtServiceImpl) {
      this.UserRepository = UserRepository
      this.Hasher = Hasher
      this.jwtService = jwtService
   }
   async execute(input: loginInput): Promise<commonOutput> {
      const { email, password } = input
      const existUser = await this.UserRepository.findUserByEmail(email)
      if (!existUser) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.EMAIL_NOT_FOUND,HTTP_STATUS.UNAUTHORIZED)
      }
      const passwordCheck = await this.Hasher.compare(password, existUser.password)
      if (!passwordCheck) {
         return ResponseHelper.failure(ERROR_MESSAGE.USER.INVALID_PASSWORD,HTTP_STATUS.UNAUTHORIZED)
      }

      const tokens = this.jwtService.generateTokens(existUser._id,existUser.email,"user")
      return ResponseHelper.loginSuccess(SUCCESS_MESSAGE.USER.LOGIN,HTTP_STATUS.OK,tokens)
   }
}

