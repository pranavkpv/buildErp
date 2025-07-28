import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IDisplayAllProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/ProjectUseCaseEntities/DisplayAllProjectEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllProjectUseCase implements IDisplayAllProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(page: number, search: string): Promise<{ getProjectListData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getProjectListData, totalPage } = await this.projectRepository.findAllProjectWithUser(page, search);
         return {
            getProjectListData,
            totalPage
         };
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}
