import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { statusChangeInput } from "../../DTO/ProjectEntities/project"
import { IChangeStatusUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message"


export class ChangeStatusUseCase implements IChangeStatusUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(input: statusChangeInput): Promise<commonOutput> {
      const { _id, status } = input
      await this.projectRepository.changeProjectStatus(_id, status)
      return ResponseHelper.success(ProjectSuccessMessage.STATUS_CHANGE + status)
   }
}

