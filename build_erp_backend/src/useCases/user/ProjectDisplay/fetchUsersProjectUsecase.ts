import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchUserProjectUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchUserProjectUsecaseEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchUserProjectUseCase implements IFetchUserProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(user: string): Promise<IProjectModelEntity[] | commonOutput> {
      try {
         const projectList = await this.projectRepository.findProjectByUserId(user)
         return projectList
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}