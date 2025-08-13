import { commonOutput } from "../../DTO/CommonEntities/common";
import { projectOutput } from "../../DTO/ProjectEntities/project";
import { IprojectRepositoryEntity } from "../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IListProjectUseCaseEntity } from "../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";
import { ProjectSuccessMessage } from "../../Shared/Messages/Project.Message";

export class ListProjectUseCase implements IListProjectUseCaseEntity {
   private projectRepository : IprojectRepositoryEntity
   constructor(projectRepository : IprojectRepositoryEntity){
      this.projectRepository = projectRepository
   }
   async execute(user:string):Promise<projectOutput | commonOutput>{
      const data = await this.projectRepository.findSitemanagerProject(user)
      return ResponseHelper.success(ProjectSuccessMessage.FETCH,data)
   }
}