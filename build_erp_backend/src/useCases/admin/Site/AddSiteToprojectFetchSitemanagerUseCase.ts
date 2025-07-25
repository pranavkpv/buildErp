
import { IAddSiteToProjectRepository } from "../../../Entities/repositoryEntities/Site-management/IAddSiteToProjectRepository"
import { IAddSiteToprojectFetchSitemanagerUseCase } from "../../../Entities/useCaseEntities/AdminUseCaseEntities/SiteUseCaseEntities/AddSiteToprojectFetchSitemanagerEntity"
import { ISitemanagerModelEntity } from "../../../Entities/ModelEntities/Sitemanager.Entity"


export class AddSiteToprojectFetchSitemanagerUseCase implements IAddSiteToprojectFetchSitemanagerUseCase {
   private addSiteToProjectRepository : IAddSiteToProjectRepository
   constructor (addSiteToProjectRepository : IAddSiteToProjectRepository){
      this.addSiteToProjectRepository = addSiteToProjectRepository
   }
   async execute():Promise<ISitemanagerModelEntity[] | null>{
      const result = await this.addSiteToProjectRepository.findSitemanagerExcludeproject()
      return result 
   }
}