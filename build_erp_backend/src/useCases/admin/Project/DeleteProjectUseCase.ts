import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { IDeleteProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DeleteProjectEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class DeleteProjectUseCase implements IDeleteProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(_id:string): Promise<commonOutput> {
      await this.projectRepository.DeleteProjectById(_id)
      return ResponseHelper.success(SUCCESS_MESSAGE.PROJECT.DELETE,HTTP_STATUS.OK)
   }
}
