import { commonOutput } from "../../dto/CommonEntities/common";
import { sitemanagerOutput } from "../../dto/SitemanagerEntities/sitemanager";
import { ISitemanagerRepositoryEntity } from "../../../domain/interfaces/Site-management/ISitemanagerRepository"
import { IDisplayAllSitemanagerUseCaseEntity } from "../../interfaces/AdminUseCaseEntities/SiteUseCaseEntities/DisplayAllsitemanagerEntity";
import { SitemanagerSuccessMessage } from "../../../Shared/Messages/Sitemanager.Message";
import { ResponseHelper } from "../../../Shared/responseHelpers/response";



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

