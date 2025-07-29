import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { IDisplayAddProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IUserModelEntity } from "../../../Entities/ModelEntities/User.Entity"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { userOutput } from "../../../Entities/Input-OutputEntities/UserEntities/user"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"


export class DisplayAddProjectUseCase implements IDisplayAddProjectUseCase {
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
   }
   async execute(): Promise<userOutput | commonOutput> {
      try {
         const userData = await this.userRepository.findAllUser()
         return {
            success:true,
            message:SUCCESS_MESSAGE.USER.FETCH,
            status_code:HTTP_STATUS.OK,
            data:userData
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
