import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { editProjectInput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project"
import { IEditProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/EditProjectEntity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../Shared/Message"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class EditProjectUseCase implements IEditProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(input: editProjectInput): Promise<commonOutput> {
      try {
         const { _id, project_name, user_id, address, mobile_number, email, area, description } = input
         const existData = await this.projectRepository.findProjectInEdit(_id, project_name)
         if (existData) {
            return ResponseHelper.failure(ERROR_MESSAGE.PROJECT.EXIST_LABOUR, HTTP_STATUS.CONFLICT)
         }
         await this.projectRepository.UpdateProjectById(_id, project_name, user_id, address, mobile_number, email, area, description)
         return ResponseHelper.success(SUCCESS_MESSAGE.PROJECT.UPDATE, HTTP_STATUS.OK)
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}

