import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IListProjectUseCase } from "../../../Entities/useCaseEntities/SitemanagerUseCaseEntities/StageStatusUpdationUseCaseEntities/ListProjectUseCaseEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class ListProjectUseCase implements IListProjectUseCase {
   private projectRepository : IprojectRepository
   constructor(projectRepository : IprojectRepository){
      this.projectRepository = projectRepository
   }
   async execute(user:string):Promise<projectOutput | commonOutput>{
     try {
      const data = await this.projectRepository.findSitemanagerProject(user)
     return {
      success:true,
      message:SUCCESS_MESSAGE.PROJECT.FETCH,
      status_code:HTTP_STATUS.OK,
      data
     }
     } catch (error:any) {
      return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
     }
   }
}