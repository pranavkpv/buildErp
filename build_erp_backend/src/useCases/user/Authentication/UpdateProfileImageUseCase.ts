import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { IUpdateProfileImageUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileImageEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class UpdateProfileImageUseCase implements IUpdateProfileImageUseCase {
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
   }
   async execute(url: string, _id: string): Promise<commonOutput> {
      try {
         await this.userRepository.UpdateProfileImage(url, _id)
         const updatedUser = await this.userRepository.findUserById(_id)
         if (!updatedUser) {
            return ResponseHelper.failure(ERROR_MESSAGE.USER.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED)
         }
         return ResponseHelper.updateSuccess(SUCCESS_MESSAGE.PROFILE.UPDATE_IMAGE, HTTP_STATUS.OK, updatedUser)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}