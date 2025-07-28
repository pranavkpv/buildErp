
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchProjectUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToProjectFetchProjectEntity"
import { IProjectModelEntity } from "../../../Entities/ModelEntities/ProjectEntity"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"


export class AddSiteToprojectFetchProjectUseCase implements IAddSiteToprojectFetchProjectUseCase {
   private addSiteToprojectRepository: IAddSiteToProjectRepository
   constructor(addSiteToprojectRepository: IAddSiteToProjectRepository) {
      this.addSiteToprojectRepository = addSiteToprojectRepository
   }
   async execute(): Promise<IProjectModelEntity[] | null | commonOutput> {
      try {
         const result = await this.addSiteToprojectRepository.findProjectWithoutSitemanager()
         return result
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}