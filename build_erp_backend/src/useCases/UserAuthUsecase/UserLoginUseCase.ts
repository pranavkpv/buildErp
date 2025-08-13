import { IHasherEntity } from "../../Entities/repositoryEntities/Auth-management/IHasher"
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { loginInput } from "../../DTO/UserEntities/user"
import { IUserLoginUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UserLoginEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { IJwtServiceEntity } from "../../Entities/Service.Entities/IToken.Entity"
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message"





export class UserLoginUseCase implements IUserLoginUseCaseEntity {
   private UserRepository: IUserRepositoryEntity
   private Hasher: IHasherEntity
   private jwtService: IJwtServiceEntity
   constructor(UserRepository: IUserRepositoryEntity, Hasher: IHasherEntity, jwtService: IJwtServiceEntity) {
      this.UserRepository = UserRepository
      this.Hasher = Hasher
      this.jwtService = jwtService
   }
   async execute(input: loginInput): Promise<commonOutput> {
      const { email, password } = input
      const existUser = await this.UserRepository.findUserByEmail(email)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const passwordCheck = await this.Hasher.compare(password, existUser.password)
      if (!passwordCheck) {
         return ResponseHelper.conflictData(userFailedMessage.INVALID_PASSWORD)
      }

      const tokens = this.jwtService.generateTokens(existUser._id, existUser.email, "user")
      return ResponseHelper.loginSuccess(userSuccessMessage.LOGIN, tokens, existUser)
   }
}

