
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { projectOutput } from "../../../Entities/Input-OutputEntities/ProjectEntities/project"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"


export class AddSiteToprojectFetchProjectUseCase implements IAddSiteToprojectFetchProjectUseCase {
   private addSiteToprojectRepository: IAddSiteToProjectRepository
   constructor(addSiteToprojectRepository: IAddSiteToProjectRepository) {
      this.addSiteToprojectRepository = addSiteToprojectRepository
   }
   async execute(): Promise<projectOutput | commonOutput> {
      try {
         const result = await this.addSiteToprojectRepository.findProjectWithoutSitemanager()
         return {
            success:true,
            message:SUCCESS_MESSAGE.PROJECT.FETCH,
            status_code:HTTP_STATUS.OK,
            data:result
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}