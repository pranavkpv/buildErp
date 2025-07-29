
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity"
import { ISitemanagerModelEntity } from "../../../Entities/ModelEntities/Sitemanager.Entity"
import { ResponseHelper } from "../../../Shared/utils/response"
import { HTTP_STATUS } from "../../../Shared/Status_code"
import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common"
import { sitemanagerOutput } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager"
import { SUCCESS_MESSAGE } from "../../../Shared/Message"


export class AddSiteToprojectFetchSitemanagerUseCase implements IAddSiteToprojectFetchSitemanagerUseCase {
   private addSiteToProjectRepository: IAddSiteToProjectRepository
   constructor(addSiteToProjectRepository: IAddSiteToProjectRepository) {
      this.addSiteToProjectRepository = addSiteToProjectRepository
   }
   async execute(): Promise<sitemanagerOutput | commonOutput> {
      try {
         const result = await this.addSiteToProjectRepository.findSitemanagerExcludeproject()
         return {
            success: true,
            message: SUCCESS_MESSAGE.SITEMANAGER.FETCH,
            status_code: HTTP_STATUS.OK,
            data: result
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}