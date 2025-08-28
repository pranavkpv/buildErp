import { IGoogleloginUseCase } from "../../IUseCases/IAuth/IGoogleLogin";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { IUserRepository } from "../../../domain/Entities/IRepository/IUser";
import { JwtService } from "../../services/JwtService";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { userLoginDTO } from "../../dto/user.dto";
import { Tokens } from "../../Entities/token.entity";
import { googleLoginInput } from "../../Entities/user.entity";
import { commonOutput } from "../../dto/common";
import { IUserMapper } from "../../../domain/mappers/IUser.mapper";
import { Role } from "../../../Shared/Constants/Role.constant";

export class GoogleloginUseCase implements IGoogleloginUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _jwtService: JwtService,
      private _usermapper: IUserMapper
   ) { }
   async execute(input: googleLoginInput):
      Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput> {
      const { email, username, profile_image } = input
      const savedUser = await this._userRepository.getUserByEmail(email)
      if (!savedUser) {
         return ResponseHelper.conflictData(userFailedMessage.EXIST_GOOGLE)
      }
      const existAuthUser = await this._userRepository.getAuthUserByEmail(email)
      if (existAuthUser) {
         const mappedUser = this._usermapper.touserLoginDTO(existAuthUser)
         const tokens = this._jwtService.generateTokens(existAuthUser._id, existAuthUser.email, Role.USER)
         return ResponseHelper.success(userSuccessMessage.LOGIN, { userData: mappedUser, tokens })
      } else {
         await this._userRepository.createGoogleUser({ email, username, profile_image })
      }
      const mappedUser = this._usermapper.touserLoginDTO(savedUser)
      const tokens = this._jwtService.generateTokens(savedUser._id, savedUser.email, Role.USER)
      return ResponseHelper.success(userSuccessMessage.LOGIN, { userData: mappedUser, tokens })
   }
}