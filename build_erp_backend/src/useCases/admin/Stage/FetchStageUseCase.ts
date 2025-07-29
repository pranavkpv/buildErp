import { IprojectRepository } from "../../../Entities/repositoryEntities/Project-management/IProjectRepository";
import { IFetchStageUsecase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/StageUseCaseEntities/FetchStageEntity";
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity";
import { ResponseHelper } from "../../../Shared/utils/response";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { projectOutput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";

export class FetchStageUsecase implements IFetchStageUsecase {
   private projectRepository: IprojectRepository
   constructor(projectRepository: IprojectRepository) {
      this.projectRepository = projectRepository
   }
   async execute(search: string, page: number): Promise<projectOutput | commonOutput> {
      try {
         const {data,totalPage} = await this.projectRepository.findStageSetProject(search, page)
         return {
            success:true,
            message:SUCCESS_MESSAGE.STAGE.FETCH,
            status_code:HTTP_STATUS.OK,
            data,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}