import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStatusBaseProjectUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchStatusBaseProjectUseCase implements IFetchStatusBaseProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(status: string,search:string,area:number,page:number): Promise<{data:IProjectModelEntity[],totalPage:number,areas:number[]} | commonOutput> {
      try {
         const statusBaseProject = await this.projectRepository.findStatusBaseProject(status,search,area,page)
      return statusBaseProject
      } catch (error:any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}