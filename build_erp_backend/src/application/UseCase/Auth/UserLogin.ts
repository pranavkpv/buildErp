import { IHasher } from "../../../domain/Entities/IRepository/IHasher"
import { IUserLoginUseCase } from "../../IUseCases/IAuth/IUserLogin"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { IUserMapper } from "../../../domain/mappers/IUser.mapper"
import { loginInput } from "../../Entities/user.entity"
import { IUserRepository } from "../../../domain/Entities/IRepository/IUser"
import { commonOutput } from "../../dto/common"
import { userLoginDTO } from "../../dto/user.dto"
import { Tokens } from "../../Entities/token.entity"
import { Role } from "../../../Shared/Constants/Role.constant"


export class UserLoginUseCase implements IUserLoginUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher,
      private _jwtService: IJwtService,
      private _usermapper: IUserMapper
   ) { }
   async execute(input: loginInput): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput> {
      const { email, password } = input
      const existUser = await this._userRepository.getUserByEmail(email)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const passwordCheck = await this._hasher.compare(password, existUser.password)
      if (!passwordCheck) {
         return ResponseHelper.conflictData(userFailedMessage.INVALID_PASSWORD)
      }
      const mappedUser = this._usermapper.touserLoginDTO(existUser)
      const tokens = this._jwtService.generateTokens(existUser._id, existUser.email, Role.USER)
      return ResponseHelper.success(userSuccessMessage.LOGIN, { userData: mappedUser, tokens })
   }
}

