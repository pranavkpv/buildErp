import { commonOutput } from "../../DTO/CommonEntities/common";
import { sitemanagerOutput } from "../../DTO/SitemanagerEntities/sitemanager";
import { ISitemanagerRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/ISitemanagerRepository"
import { IDisplayAllSitemanagerUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity";
import { SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message";
import { ResponseHelper } from "../../Shared/ResponseHelper/response";



export class DisplayAllSitemanagerUseCase implements IDisplayAllSitemanagerUseCaseEntity {
   private SitemanagerRepository: ISitemanagerRepositoryEntity
   constructor(SitemanagerRepository: ISitemanagerRepositoryEntity) {
      this.SitemanagerRepository = SitemanagerRepository
   }
   async execute(page: number, search: string): Promise<sitemanagerOutput | commonOutput> {
      const { getSiteData, totalPage } = await this.SitemanagerRepository.findAllSitemanager({ page, search })
      return ResponseHelper.success(SitemanagerSuccessMessage.FETCH, getSiteData, totalPage)
   }
}

