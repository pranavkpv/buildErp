import { commonOutput } from "../../DTO/CommonEntities/common";
import { UpdateProfile } from "../../DTO/UserEntities/user";
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { IUpdateProfileUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdateProfileEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message";

export class UpdateProfileUsecase implements IUpdateProfileUseCaseEntity {
   private userRepository: IUserRepositoryEntity
   constructor(userRepository: IUserRepositoryEntity) {
      this.userRepository = userRepository
   }
   async execute(input: UpdateProfile): Promise<commonOutput> {
      const { id, username, email, phone } = input
      const existUser = await this.userRepository.findUserById(id)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      await this.userRepository.UpdateProfile(id, username, email, phone)
      const updatedUser = await this.userRepository.findUserById(id)
      if (!updatedUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      return ResponseHelper.success(userSuccessMessage.UPDATE_PROFILE, updatedUser)
   }
}