import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { sitemanagerOutput } from "../../../Entities/Input-OutputEntities/SitemanagerEntities/sitemanager";
import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { IDisplayAllSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity";
import { SUCCESS_MESSAGE } from "../../../Shared/Message";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllSitemanagerUseCase implements IDisplayAllSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(page: number, search: string): Promise<sitemanagerOutput | commonOutput> {
      try {
         const { getSiteData, totalPage } = await this.SitemanagerRepository.findAllSitemanager(page, search)
         return {
            success:true,
            message:SUCCESS_MESSAGE.SITEMANAGER.FETCH,
            status_code:HTTP_STATUS.OK,
            data:getSiteData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}

