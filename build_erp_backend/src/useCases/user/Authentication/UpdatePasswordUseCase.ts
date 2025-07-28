import { IHasher } from "../../../Entities/repositoryEntities/Auth-management/IHasher";
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IUpdatePasswordUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdatePasswordEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";

export class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
   private userRepository: IUserRepository
   private hasher: IHasher
   constructor(userRepository: IUserRepository, hasher: IHasher) {
      this.userRepository = userRepository
      this.hasher = hasher
   }
   async execute(input: { email: string, password: string }): Promise<commonOutput> {
      try {
         const { email, password } = input
         const existUser = await this.userRepository.findUserByEmail(email)
         if (!existUser) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
         }
         const hashedPass = await this.hasher.hash(password)
         await this.userRepository.updatePassword(existUser._id, hashedPass)
         return ResponseHelper.success(SUCCESS_MESSAGE.USER.PASSWORD_UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}