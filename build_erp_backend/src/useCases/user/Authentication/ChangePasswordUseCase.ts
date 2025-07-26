import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { UpdatePassword } from "../../../Entities/Input-OutputEntities/UserEntities/user";
import { IHasher } from "../../../Entities/repositoryEntities/Auth-management/IHasher";
import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository";
import { IChangePasswordUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/AuthenticationUseCaseEntities/ChangePasswordEntity";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ChangePasswordUsecase implements IChangePasswordUseCase {
   private userRepository : IUserRepository
   private hasher : IHasher
   constructor(userRepository : IUserRepository,hasher : IHasher){
      this.userRepository=userRepository
      this.hasher = hasher
   }
   async execute(input: UpdatePassword): Promise<commonOutput> {
       const {_id,email,currentPassword,password} = input
       const existAuthUser = await this.userRepository.findExistAuthUser(email)
       if(existAuthUser){
         return ResponseHelper.failure(ERROR_MESSAGE.UPDATEPASSWORD.EXIST_GOOGLE,HTTP_STATUS.BAD_REQUEST)
       }
       const existUser = await this.userRepository.findUserById(_id)
       if(!existUser){
         return ResponseHelper.failure(ERROR_MESSAGE.USER.USER_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
       }
       const hashedCurrentPassword = await this.hasher.compare(currentPassword,existUser.password)
       if(!hashedCurrentPassword){
          return ResponseHelper.failure(ERROR_MESSAGE.UPDATEPASSWORD.CURRENTPASSWORD_WRONG,HTTP_STATUS.CONFLICT)
       }
       const hashedPassword = await this.hasher.hash(password)
       await this.userRepository.updatePassword(_id,hashedPassword)
       return ResponseHelper.success(SUCCESS_MESSAGE.USER.PASSWORD_UPDATE,HTTP_STATUS.OK)
   }
}