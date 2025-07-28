import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IListProjectUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ListProjectUseCase implements IListProjectUseCase {
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(user:string):Promise<IProjectModelEntity[] | commonOutput>{
     try {
      const data = await this.projectRepository.findSitemanagerProject(user)
     return data
     } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}