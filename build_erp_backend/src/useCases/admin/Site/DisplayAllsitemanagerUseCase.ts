import { commonOutput } from "../../../Entities/Input-OutputEntities/CommonEntities/common";
import { ISitemanagerRepository } from "../../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { IDisplayAllSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity";
import { HTTP_STATUS } from "../../../Shared/Status_code";
import { ResponseHelper } from "../../../Shared/utils/response";



export class DisplayAllSitemanagerUseCase implements IDisplayAllSitemanagerUseCase {
   private SitemanagerRepository: ISitemanagerRepository
   constructor(SitemanagerRepository: ISitemanagerRepository) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(page: number, search: string): Promise<{ getSiteData: any[]; totalPage: number } | commonOutput> {
      try {
         const { getSiteData, totalPage } = await this.SitemanagerRepository.findAllSitemanager(page, search)
         return {
            getSiteData,
            totalPage
         }
      } catch (error: any) {
         return ResponseHelper.failure(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
      }
   }
}

