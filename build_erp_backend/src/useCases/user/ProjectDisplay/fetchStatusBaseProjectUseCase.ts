import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project";
import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStatusBaseProjectUseCase } from "../../../Entities/useCaseEntities/UserUseCaseEntities/ProjectDisplayUseCaseEntities/FetchStatusBaseProjectUseCaseEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";

export class FetchStatusBaseProjectUseCase implements IFetchStatusBaseProjectUseCase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(status: string, search: string, area: number, page: number): Promise<projectOutput | commonOutput> {
      try {
         const { data, totalPage, areas } = await this.projectRepository.findStatusBaseProject(status, search, area, page)
         return {
            success: true,
            message: SUCCESS_MESSAGE.PROJECT.FETCH,
            status_code: HTTP_STATUS.OK,
            data,
            totalPage,
            areas
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}