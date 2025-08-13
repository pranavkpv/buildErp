import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { projectOutput } from "../../DTO/ProjectEntities/project";
import { IFetchProjectUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/FetchProjectEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { commonOutput } from "../../DTO/CommonEntities/common";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";

export class FetchProjectUseCase implements IFetchProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(): Promise<projectOutput | commonOutput> {
      const data = await this.projectRepository.fetchProject()
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, data)
   }
}