import { commonOutput } from "../../DTO/CommonEntities/common";
import { projectOutput } from "../../DTO/ProjectEntities/project";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchUserProjectUseCaseEntity } from "../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchUserProjectUsecaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";

export class FetchUserProjectUseCase implements IFetchUserProjectUseCaseEntity {
   private projectRepository: IprojectRepositoryEntity
   constructor(projectRepository: IprojectRepositoryEntity) {
      this.projectRepository = projectRepository
   }
   async execute(user: string): Promise<projectOutput | commonOutput> {
      const projectList = await this.projectRepository.findProjectByUserId(user)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH, projectList)
   }
}