import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository";
import { IUpdateProfileUseCase } from "../../interfaces/UserUseCaseEntities/AuthenticationUseCaseEntities/IUpdateProfile.usecase";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { updateprofileInput } from "../../entities/user.entity";
import { commonOutput } from "../../dto/common";
import { userLoginDTO } from "../../dto/user.dto";
import { IUserMapper } from "../../../domain/mappers/IUser.mapper";
import { JwtService } from "../../services/JwtService";
import { Tokens } from "../../entities/token.entity";


export class UpdateProfileUsecase implements IUpdateProfileUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _userMapper: IUserMapper,
      private _jwtService: JwtService
   ) { }
   async execute(input: Omit<updateprofileInput, "password">): Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput> {
      const { _id, username, email, phone } = input
      const existUser = await this._userRepository.getUserById(_id)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      await this._userRepository.updateUserProfile(input)
      const updatedUser = await this._userRepository.getUserById(_id)
      if (!updatedUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const mappedUser = this._userMapper.touserLoginDTO(updatedUser)
      const tokens = this._jwtService.generateTokens(existUser._id, existUser.email, "user")
      return ResponseHelper.success(userSuccessMessage.UPDATE_PROFILE, { userData:mappedUser, tokens })
   }
}