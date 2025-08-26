import { IUpdateProfileImageUseCase } from "../../IUseCases/IUserProfile/IUpdateProfileImage";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message";
import { IUserRepository } from "../../../domain/Entities/IRepository/IUser";
import { commonOutput } from "../../dto/common";
import { IUserMapper } from "../../../domain/mappers/IUser.mapper";
import { IJwtService } from "../../../domain/Entities/Service.Entities/IJwtservice";
import { userLoginDTO } from "../../dto/user.dto";
import { Tokens } from "../../Entities/token.entity";

export class UpdateProfileImageUseCase implements IUpdateProfileImageUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _usermapper: IUserMapper,
      private _jwtService: IJwtService
   ) { }
   async execute(url: string, _id: string):
      Promise<commonOutput<{ userData: userLoginDTO; tokens: Tokens }> | commonOutput> {
      await this._userRepository.updateUserProfileImage(url, _id)
      const updatedUser = await this._userRepository.getUserById(_id)
      if (!updatedUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const mappedUser = this._usermapper.touserLoginDTO(updatedUser)
      const tokens = this._jwtService.generateTokens(updatedUser._id, updatedUser.email, "user")
      return ResponseHelper.success(userSuccessMessage.UPDATE_IMAGE, { userData: mappedUser, tokens })
   }
}