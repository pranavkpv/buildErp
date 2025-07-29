import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { addProjectInput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project"
import { IAddProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/AddProjectEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class AddProjectUseCase implements IAddProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: addProjectInput): Promise<commonOutput> {
      try {
         const { project_name, user_id, address, mobile_number, email, area, description } = input
         const existProject = await this.projectRepository.findProjectByName(project_name)
         if (existProject) {
            return ResponseHelper.failure(ERROR_MESSAGE.PROJECT.EXIST_PROJECT, HTTP_STATUS.CONFLICT)
         }
         const status = "pending"
         await this.projectRepository.saveProject(project_name, user_id, address, mobile_number, email, area, description, status)
         return ResponseHelper.success(SUCCESS_MESSAGE.PROJECT.ADD, HTTP_STATUS.CREATED)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
