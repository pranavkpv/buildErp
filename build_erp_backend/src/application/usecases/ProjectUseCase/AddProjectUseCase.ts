import { IAddProjectUseCase } from "../../interfaces/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { ResponseHelper } from "../../../Shared/responseHelpers/response"

import { ProjectFailedMessage, ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message"
import { IprojectRepository } from "../../../domain/interfaces/Project-management/IProjectRepository"
import { addProjectInput } from "../../entities/project.entity"
import { commonOutput } from "../../dto/common"


export class AddProjectUseCase implements IAddProjectUseCase {

   constructor(
      private _projectRepository: IprojectRepository
   ) { }
   async execute(input: addProjectInput): Promise<commonOutput> {
      const { project_name, user_id, address, mobile_number, email, area, description, latitude, longitude } = input
      const existProject = await this._projectRepository.findProjectByName(project_name)
      if (existProject) {
         return ResponseHelper.conflictData(ProjectFailedMessage.EXIST_PROJECT)
      }
      await this._projectRepository.saveProject({ project_name, user_id, address, mobile_number, email, area, description, latitude, longitude })
      return ResponseHelper.createdSuccess(ProjectSuccessMessage.ADD)
   }
}
