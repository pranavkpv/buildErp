import { IHasher } from "../../../domain/interfaces/Auth-management/IHasher"
import { IUserRepository } from "../../../domain/interfaces/User-management/IUserRepository"
import { userFailedMessage, userSuccessMessage } from "../../../Shared/Messages/User.Message"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { commonOutput } from "../../dto/common"
import { loginInput } from "../../entities/user.entity"
import { IUpdatePasswordUseCase } from "../../interfaces/useCase.Entity/Auth.UseCase/IUpdatepassword.usecase"

export class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
   constructor(
      private _userRepository: IUserRepository,
      private _hasher: IHasher
   ) { }
   async execute(input: loginInput): Promise<commonOutput> {
      const { email, password } = input
      const existUser = await this._userRepository.getUserByEmail(email)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const hashedPass = await this._hasher.hash(password)
      await this._userRepository.updateUserPassword(existUser._id, hashedPass)
      return ResponseHelper.success(userSuccessMessage.PASSWORD_UPDATE)
   }
}