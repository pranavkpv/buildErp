import { IUserRepositoryEntity } from "../../../domain/interfaces/User-management/IUserRepository"
import { IDisplayAddProjectUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAddProjectEntity"
import { commonOutput } from "../../dto/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { userOutput } from "../../dto/UserEntities/user"
import { userSuccessMessage } from "../../../Shared/Messages/User.Message"


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
