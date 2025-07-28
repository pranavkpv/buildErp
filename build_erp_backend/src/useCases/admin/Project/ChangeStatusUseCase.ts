import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { statusChangeInput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project"
import { IChangeStatusUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class ChangeStatusUseCase implements IChangeStatusUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: statusChangeInput): Promise<commonOutput> {
      try {
         const { _id, status } = input
         await this.projectRepository.changeProjectStatus(_id, status)
         return ResponseHelper.success(SUCCESS_MESSAGE.PROJECT + status, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}

