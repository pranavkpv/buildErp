import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { projectOutput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project";
import { IFetchProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";

export class FetchProjectUseCase implements IFetchProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(): Promise<projectOutput | commonOutput> {
      try {
         const data = await this.projectRepository.fetchProject()
         return {
            success:true,
            message:SUCCESS_MESSAGE.PROJECT.FETCH,
            status_code:HTTP_STATUS.OK,
            data
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}