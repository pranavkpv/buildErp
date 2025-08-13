import { commonOutput } from "../../DTO/CommonEntities/common";
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { IUpdateProfileImageUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileImageEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message";

export class UpdateProfileImageUseCase implements IUpdateProfileImageUseCaseEntity {
   private userRepository: IUserRepositoryEntity
   constructor(userRepository: IUserRepositoryEntity) {
      this.userRepository = userRepository
   }
   async execute(url: string, _id: string): Promise<commonOutput> {
      await this.userRepository.UpdateProfileImage(url, _id)
      const updatedUser = await this.userRepository.findUserById(_id)
      if (!updatedUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      return ResponseHelper.success(userSuccessMessage.UPDATE_IMAGE, updatedUser)
   }
}