import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { addProjectInput } from "../../DTO/ProjectEntities/project"
import { IAddProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"

import { ProjectFailedMessage, ProjectSuccessMessage } from "../../Shared/Messages/Project.Message"


export class AddProjectUseCase implements IAddProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(input: addProjectInput): Promise<commonOutput> {
      const { project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input
      const existProject = await this.projectRepository.findProjectByName(project_name)
      if (existProject) {
         return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT)
      }
      await this.projectRepository.saveProject({project_name, user_id, address, mobile_number, email, area, description, latitude, longitude})
      return ResponseHelper.createdSuccess(ProjectSuccessMessage.ADD)
   }
}
