import { IAddSiteToProjectRepositoryEntity } from "../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchSitemanagerUseCaseEntity } from "../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity"
import { ResponseHelper } from "../../Shared/ResponseHelper/response"
import { commonOutput } from "../../DTO/CommonEntities/common"
import { sitemanagerOutput } from "../../DTO/SitemanagerEntities/sitemanager"
import { SitemanagerSuccessMessage } from "../../Shared/Messages/Sitemanager.Message"


export class AddSiteToprojectFetchSitemanagerUseCase implements IAddSiteToprojectFetchSitemanagerUseCaseEntity {
   private addSiteToProjectRepository: IAddSiteToProjectRepositoryEntity
   constructor(addSiteToProjectRepository: IAddSiteToProjectRepositoryEntity) {
      this.addSiteToProjectRepository = addSiteToProjectRepository
   }
   async execute(): Promise<sitemanagerOutput | commonOutput> {
      const result = await this.addSiteToProjectRepository.findSitemanagerExcludeproject()
      return ResponseHelper.success(SitemanagerSuccessMessage.FETCH, result)
   }
}