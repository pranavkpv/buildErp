import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { Project } from "../../../Entities/Input-OutputEntities/ProjectEntities/project";
import { IFetchProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";

export class FetchProjectUseCase implements IFetchProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async axecute(): Promise<IProjectModelEntity[] | commonOutput> {
      try {
         const data = await this.projectRepository.fetchProject()
         return data
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}