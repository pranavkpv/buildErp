import { commonOutput } from "../../dto/CommonEntities/common";
import { projectOutput } from "../../dto/ProjectEntities/project";
import { IprojectRepositoryEntity } from "../../../domain/interfaces/Project-management/IProjectRepository";
import { IListProjectUseCaseEntity } from "../../interfaces/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";
import { ProjectSuccessMessage } from "../../../Shared/Messages/Project.Message";

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