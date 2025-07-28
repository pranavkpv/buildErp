import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { UpdateProfile } from "../../../Entities/Input-OutputEntities/UserEntities/user";
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { IUpdateProfileUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class UpdateProfileUsecase implements IUpdateProfileUseCase {
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
   }
   async execute(input: UpdateProfile): Promise<commonOutput> {
      try {
         const { id, username, email, phone } = input
         const existUser = await this.userRepository.findUserById(id)
         if (!existUser) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
         }
         await this.userRepository.UpdateProfile(id, username, email, phone)
         const updatedUser = await this.userRepository.findUserById(id)
         if (!updatedUser) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
         }
         return ResponseHelper.updateSuccess(SUCCESS_MESSAGE.PROFILE.UPDATE_PROFILE, HTTP_STATUS.OK, updatedUser)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}