import { IUserRepositoryEntity } from "../../Entities/repositoryEntities/User-management/IUserRepository"
import { IDisplayAddProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { userOutput } from "../../DTO/UserEntities/user"
import { userSuccessMessage } from "../../Shared/Messages/User.Message"


export class DisplayAddProjectUseCase implements IDisplayAddProjectUseCaseEntity {
   private userRepository: IUserRepositoryEntity
   constructor(userRepository: IUserRepositoryEntity) {
      this.userRepository = userRepository
   }
   async execute(): Promise<userOutput | commonOutput> {
      const userData = await this.userRepository.findAllUser()
      return ResponseHelper.success(userSuccessMessage.FETCH, userData)
   }
}
