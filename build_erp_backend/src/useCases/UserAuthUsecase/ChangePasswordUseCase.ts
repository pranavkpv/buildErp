import { commonOutput } from "../../DTO/CommonEntities/common";
import { UpdatePassword } from "../../DTO/UserEntities/user";
import { IChangePasswordUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ChangePasswordEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { IHasherEntity } from "../../Entities/repositoryEntities/Auth-management/IHasher";
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message";

export class ChangePasswordUsecase implements IChangePasswordUseCaseEntity {
   private userRepository: IUserRepositoryEntity
   private hasher: IHasherEntity
   constructor(userRepository: IUserRepositoryEntity, hasher: IHasherEntity) {
      this.userRepository = userRepository
      this.hasher = hasher
   }
   async execute(input: UpdatePassword): Promise<commonOutput> {
      const { _id, email, currentPassword, password } = input
      const existAuthUser = await this.userRepository.findExistAuthUser(email)
      if (existAuthUser) {
         return ResponseHelper.badRequest(userFailedMessage.EXIST_GOOGLE)
      }
      const existUser = await this.userRepository.findUserById(_id)
      if (!existUser) {
         return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
      }
      const hashedCurrentPassword = await this.hasher.compare(currentPassword, existUser.password)
      if (!hashedCurrentPassword) {
         return ResponseHelper.conflictData(userFailedMessage.CURRENTPASSWORD_WRONG)
      }
      const hashedPassword = await this.hasher.hash(password)
      await this.userRepository.updatePassword(_id, hashedPassword)
      return ResponseHelper.success(userSuccessMessage.PASSWORD_UPDATE)
   }
}