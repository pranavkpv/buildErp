import { IUserRepository } from "../../../Entities/repositoryEntities/User-management/IUserRepository"
import { IDisplayAddProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { IUserModelEntity } from "../../../Entities/ModelEntities/User.Entity"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class DisplayAddProjectUseCase implements IDisplayAddProjectUseCase {
   private userRepository: IUserRepository
   constructor(userRepository: IUserRepository) {
      this.userRepository = userRepository
   }
   async execute(): Promise<IUserModelEntity[] | [] | commonOutput> {
      try {
         const userData = await this.userRepository.findAllUser()
         return userData
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
