import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository"
import { commonOutput } from "../../dto/CommonEntities/common"
import { statusChangeInput } from "../../dto/ProjectEntities/project"
import { IChangeStatusUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/ChangeStatusEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message"


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

