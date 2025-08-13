import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { editProjectInput } from "../../DTO/ProjectEntities/project"
import { IEditProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { ProjectFailedMessage, ProjectSuccessMessage } from "../../Shared/Messages/Project.Message"


export class EditProjectUseCase implements IEditProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(input: editProjectInput): Promise<commonOutput> {
      const { _id, project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input
      const existData = await this.projectRepository.findProjectInEdit(_id, project_name)
      if (existData) {
         return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT)
      }
      await this.projectRepository.UpdateProjectById({ _id, project_name, user_id, address, mobile_number, email, area, description, latitude, longitude })
      return ResponseHelper.success(ProjectSuccessMessage.UPDATE)
   }
}

