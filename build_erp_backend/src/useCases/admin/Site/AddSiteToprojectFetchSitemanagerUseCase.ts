
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity"
import { ISitemanagerModelEntity } from "../../../Entities/ModelEntities/Sitemanager.Entity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"


export class AddSiteToprojectFetchSitemanagerUseCase implements IAddSiteToprojectFetchSitemanagerUseCase {
   private addSiteToProjectRepository: IAddSiteToProjectRepository
   constructor(addSiteToProjectRepository: IAddSiteToProjectRepository) {
      this.addSiteToProjectRepository = addSiteToProjectRepository
   }
   async execute(): Promise<ISitemanagerModelEntity[] | null | commonOutput> {
      try {
         const result = await this.addSiteToProjectRepository.findSitemanagerExcludeproject()
         return result
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}