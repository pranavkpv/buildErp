import { IHasherEntity } from "../../Entities/repositoryEntities/Auth-management/IHasher";
import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { IUpdatePasswordUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/UpdatePasswordEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { userFailedMessage, userSuccessMessage } from "../../Shared/Messages/User.Message";

export class UpdatePasswordUseCase implements IUpdatePasswordUseCaseEntity {
   private userRepository: IUserRepositoryEntity
   private hasher: IHasherEntity
   constructor(userRepository: IUserRepositoryEntity, hasher: IHasherEntity) {
      this.userRepository = userRepository
      this.hasher = hasher
   }
   async execute(input: { email: string, password: string }): Promise<commonOutput> {
         const { email, password } = input
         const existUser = await this.userRepository.findUserByEmail(email)
         if (!existUser) {
            return ResponseHelper.badRequest(userFailedMessage.USER_NOT_FOUND)
         }
         const hashedPass = await this.hasher.hash(password)
         await this.userRepository.updatePassword(existUser._id, hashedPass)
         return ResponseHelper.success(userSuccessMessage.PASSWORD_UPDATE)
   }
}